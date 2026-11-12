import { AppError } from "../../../core/errors/app.error.js";
import { nextDisplayOrder, withoutUndefined } from "../../../core/utils/collection.util.js";

/**
 * Shared admin logic for list-style content (skills, projects, …).
 * No HTML, no DOM: it only talks to use cases.
 *
 * Subclasses implement:
 *   buildEntity(values, existing) → domain entity (may upload files)
 *   toEditable(item)              → the editable fields of an existing item
 */
export class CrudAdminController {
    constructor({ getAll, create, update, remove }) {
        this.useCases = { getAll, create, update, remove };
    }

    async list() {
        return await this.useCases.getAll.execute();
    }

    async find(id) {
        const items = await this.list();
        const item = items.find(entry => String(entry.id) === String(id));

        if (!item) {
            throw new AppError("This item no longer exists", "NOT_FOUND");
        }

        return item;
    }

    async save(id, values) {
        const existing = id ? await this.find(id) : null;
        const entity = withoutUndefined(await this.buildEntity(values, existing));

        if (existing) {
            return await this.useCases.update.execute(id, {
                ...this.toEditable(existing),
                ...entity,
            });
        }

        const items = await this.list();

        return await this.useCases.create.execute({
            ...entity,
            display_order: entity.display_order ?? this.nextOrderFor(entity, items),
        });
    }

    async remove(id) {
        return await this.useCases.remove.execute(id);
    }

    /** Persists a new order: item at position i gets display_order i + 1 (only if it changed). */
    async applyOrder(orderedItems) {
        await Promise.all(
            orderedItems
                .map((item, index) => ({ item, order: index + 1 }))
                .filter(({ item, order }) => item.display_order !== order)
                .map(({ item, order }) =>
                    this.useCases.update.execute(item.id, {
                        ...this.toEditable(item),
                        display_order: order,
                    })
                )
        );
    }

    /** Moves an item one step up (-1) or down (+1) in display order. */
    async move(id, direction) {
        const items = [...(await this.list())].sort(
            (a, b) => (a.display_order ?? 0) - (b.display_order ?? 0)
        );

        const index = items.findIndex(item => String(item.id) === String(id));
        const target = index + direction;

        if (index < 0 || target < 0 || target >= items.length) return;

        [items[index], items[target]] = [items[target], items[index]];

        await this.applyOrder(items);
    }

    /** Default display_order for a new item. Override when ordering is scoped (e.g. per category). */
    // eslint-disable-next-line no-unused-vars
    nextOrderFor(entity, items) {
        return nextDisplayOrder(items);
    }

    // eslint-disable-next-line no-unused-vars
    async buildEntity(values, existing) {
        throw new Error("Method not implemented");
    }

    // eslint-disable-next-line no-unused-vars
    toEditable(item) {
        throw new Error("Method not implemented");
    }
}
