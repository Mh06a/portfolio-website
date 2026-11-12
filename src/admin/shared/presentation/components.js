import { html } from "../../../shared/presentation/utils/html.util.js";

/* ---------- page chrome ---------- */

export function pageHeader({ title, subtitle, actionLabel, actionHref, backLabel, backHref }) {
    return html`
        <header class="page-header">
            <div>
                ${backHref && html`<a href="${backHref}" class="page-back">← ${backLabel}</a>`}
                <h1 class="page-title">${title}</h1>
                ${subtitle && html`<p class="page-subtitle">${subtitle}</p>`}
            </div>

            ${actionHref && html`<a href="${actionHref}" class="btn btn-primary">+ ${actionLabel}</a>`}
        </header>
    `;
}

export function pill(text) {
    return html`<span class="pill">${text}</span>`;
}

export function badge(text, tone = "neutral") {
    return html`<span class="badge badge-${tone}">${text}</span>`;
}

export function emptyState(message, actionLabel, actionHref) {
    return html`
        <div class="empty-state">
            <p>${message}</p>
            ${actionHref && html`<a href="${actionHref}" class="btn btn-primary">+ ${actionLabel}</a>`}
        </div>
    `;
}

export function sideNote({ title, text, tip }) {
    return html`
        <aside class="side-note">
            <span class="eyebrow">GOOD TO KNOW</span>
            <h3>${title}</h3>
            <p>${text}</p>
            ${tip && html`<p class="side-note-tip">${tip}</p>`}
        </aside>
    `;
}

/* ---------- forms ---------- */

export function formCard({ title, body }) {
    return html`
        <section class="card form-card">
            <h2 class="card-title">${title}</h2>
            <p class="card-hint">Fields marked * are required</p>
            ${body}
        </section>
    `;
}

export function formActions({ cancelHref, submitLabel = "Save Changes" }) {
    return html`
        <div class="form-actions">
            <button type="submit" class="btn btn-primary">${submitLabel}</button>
            <a href="${cancelHref}" class="btn btn-ghost">Cancel</a>
        </div>
        <p class="field-error" data-error-for="_form"></p>
    `;
}

export function fieldRow(...fields) {
    return html`<div class="field-row">${fields}</div>`;
}

function fieldShell({ label, name, required, hint, control }) {
    return html`
        <div class="field">
            <label class="field-label" for="f-${name}">${label}${required && " *"}</label>
            ${control}
            ${hint && html`<p class="field-hint">${hint}</p>`}
            <p class="field-error" data-error-for="${name}"></p>
        </div>
    `;
}

export function inputField({
    label, name, value = "", type = "text", required = false, hint = "",
    placeholder = "", disabled = false, min, step, autocomplete,
}) {
    return fieldShell({
        label, name, required, hint,
        control: html`
            <input
                class="input"
                id="f-${name}"
                name="${name}"
                type="${type}"
                value="${value ?? ""}"
                placeholder="${placeholder}"
                ${min !== undefined && html`min="${min}"`}
                ${step !== undefined && html`step="${step}"`}
                ${autocomplete && html`autocomplete="${autocomplete}"`}
                ${disabled && html`disabled`}
            >
        `,
    });
}

export function textareaField({ label, name, value = "", required = false, hint = "", rows = 4, placeholder = "" }) {
    return fieldShell({
        label, name, required, hint,
        control: html`<textarea class="input" id="f-${name}" name="${name}" rows="${rows}" placeholder="${placeholder}">${value ?? ""}</textarea>`,
    });
}

export function selectField({ label, name, value, options, required = false, hint = "" }) {
    return fieldShell({
        label, name, required, hint,
        control: html`
            <select class="input" id="f-${name}" name="${name}">
                ${options.map(option => html`
                    <option value="${option.value}" ${option.value === value && html`selected`}>${option.label}</option>
                `)}
            </select>
        `,
    });
}

export function toggleField({ label, name, checked = false, hint = "" }) {
    return html`
        <div class="field">
            <label class="toggle">
                <input type="checkbox" name="${name}" ${checked && html`checked`}>
                <span class="toggle-track"></span>
                <span class="toggle-text">
                    <strong>${label}</strong>
                    ${hint && html`<small>${hint}</small>`}
                </span>
            </label>
        </div>
    `;
}

export function radioGroup({ label, name, value, options, hint }) {
    return html`
        <div class="field">
            <span class="field-label">${label} *</span>
            <div class="radio-group">
                ${options.map(option => html`
                    <label class="radio">
                        <input type="radio" name="${name}" value="${option.value}" ${option.value === value && html`checked`}>
                        <span>${option.label}</span>
                    </label>
                `)}
            </div>
            ${hint && html`<p class="field-hint">${hint}</p>`}
            <p class="field-error" data-error-for="${name}"></p>
        </div>
    `;
}

/** File picker with an optional image preview and the current file's name. */
export function fileField({ label, name, accept, buttonLabel, hint, previewUrl, currentName, errorKey = name, emptyText = "Nothing uploaded yet" }) {
    return html`
        <div class="field" data-file-field>
            <span class="field-label">${label}</span>

            <div class="file-box">
                ${previewUrl
                    ? html`<img class="file-preview" src="${previewUrl}" alt="" data-file-preview>`
                    : html`<img class="file-preview" alt="" data-file-preview hidden>`}

                <p class="file-name" data-file-name data-empty="${emptyText}">${currentName || emptyText}</p>

                <label class="btn btn-soft file-button">
                    ${buttonLabel}
                    <input type="file" name="${name}" accept="${accept}" hidden>
                </label>
            </div>

            ${hint && html`<p class="field-hint">${hint}</p>`}
            <p class="field-error" data-error-for="${errorKey}"></p>
        </div>
    `;
}

/** Removable chips backed by hidden `name[]` inputs. The binder adds/removes chips. */
export function chip(name, value) {
    return html`
        <span class="chip" data-chip>
            ${value}
            <input type="hidden" name="${name}[]" value="${value}">
            <button type="button" class="chip-remove" data-chip-remove aria-label="Remove ${value}">×</button>
        </span>
    `;
}

export function chipPicker({ label, name, values, suggestions = [], placeholder, addLabel, hint }) {
    return html`
        <div class="field" data-chip-picker="${name}">
            <span class="field-label">${label}</span>

            <div class="chips" data-chip-list>
                ${values.map(value => chip(name, value))}
            </div>

            <div class="chip-add">
                <input class="input" type="text" list="dl-${name}" placeholder="${placeholder}" data-chip-input>
                <datalist id="dl-${name}">
                    ${suggestions.map(item => html`<option value="${item}"></option>`)}
                </datalist>
                <button type="button" class="btn btn-soft" data-chip-add>+ ${addLabel}</button>
            </div>

            ${hint && html`<p class="field-hint">${hint}</p>`}
            <p class="field-error" data-error-for="${name}"></p>
        </div>
    `;
}
