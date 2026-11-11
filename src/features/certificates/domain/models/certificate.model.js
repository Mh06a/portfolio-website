export class Certificate {
    constructor({
        id = null,
        name,
        issuing_organization,
        issue_date = null,
        certificate_url = null,
        certificate_file_path = null,
        display_order = 0,
        created_at = null,
        updated_at = null,
    }) {
        this.id = id;
        this.name = name;
        this.issuing_organization = issuing_organization;
        this.issue_date = issue_date;
        this.certificate_url = certificate_url;
        this.certificate_file_path = certificate_file_path;
        this.display_order = display_order;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}