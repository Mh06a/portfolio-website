export const TABLES = Object.freeze({
    PROFILE: "profile",
    ADMINS: "admins",
    EDUCATION: "education",
    EDUCATION_SUBJECTS: "education_subjects",
    EXPERIENCE: "experience",
    SKILLS: "skills",
    PROJECTS: "projects",
    TECHNOLOGIES: "technologies",
    PROJECT_TECHNOLOGIES: "project_technologies",
    CERTIFICATES: "certificates",
});
/** Column names of `education_subjects` (see the SQL schema). */
export const EDUCATION_SUBJECT_COLUMNS = Object.freeze({
    educationId: "education_id",
    name: "subject_name",
    displayOrder: "display_order",
});
