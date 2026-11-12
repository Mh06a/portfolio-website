/**
 * Composition root – the ONLY place that knows which concrete classes are used.
 * Everything else depends on abstractions that are handed to it.
 * All data comes from Supabase: there is no bundled/local content.
 */
import { SupabaseStorageDataSource } from "../../shared/data/datasources/supabase-storage.datasource.js";
import { StorageRepositoryImpl } from "../../shared/data/repositories/storage.repository.impl.js";
import { ResolveAssetUrlUseCase } from "../../shared/domain/usecases/resolve-asset-url.usecase.js";

import { SupabaseProfileDataSource } from "../../features/profile/data/datasources/supabase-profile.datasource.js";
import { ProfileRepositoryImpl } from "../../features/profile/data/repositories/profile.repository.impl.js";
import { GetProfileUseCase } from "../../features/profile/domain/usecases/get-profile.usecase.js";

import { SupabaseEducationDataSource } from "../../features/education/data/datasources/supabase-education.datasource.js";
import { EducationRepositoryImpl } from "../../features/education/data/repositories/education.repository.impl.js";
import { GetEducationUseCase } from "../../features/education/domain/usecases/get-education.usecase.js";

import { SupabaseExperienceDataSource } from "../../features/experience/data/datasources/supabase-experience.datasource.js";
import { ExperienceRepositoryImpl } from "../../features/experience/data/repositories/experience.repository.impl.js";
import { GetExperiencesUseCase } from "../../features/experience/domain/usecases/get-experiences.usecase.js";

import { SupabaseSkillDataSource } from "../../features/skills/data/datasources/supabase-skill.datasource.js";
import { SkillRepositoryImpl } from "../../features/skills/data/repositories/skill.repository.impl.js";
import { GetSkillsUseCase } from "../../features/skills/domain/usecases/get-skills.usecase.js";

import { SupabaseProjectDataSource } from "../../features/projects/data/datasources/supabase-project.datasource.js";
import { ProjectRepositoryImpl } from "../../features/projects/data/repositories/project.repository.impl.js";
import { GetProjectsUseCase } from "../../features/projects/domain/usecases/get-projects.usecase.js";

import { SupabaseCertificateDataSource } from "../../features/certificates/data/datasources/supabase-certificate.datasource.js";
import { CertificateRepositoryImpl } from "../../features/certificates/data/repositories/certificate.repository.impl.js";
import { GetCertificatesUseCase } from "../../features/certificates/domain/usecases/get-certificates.usecase.js";

export function createContainer() {
    const storageRepository = new StorageRepositoryImpl(new SupabaseStorageDataSource());

    const profileRepository = new ProfileRepositoryImpl(
        new SupabaseProfileDataSource()
    );
    const educationRepository = new EducationRepositoryImpl(
        new SupabaseEducationDataSource()
    );
    const experienceRepository = new ExperienceRepositoryImpl(
        new SupabaseExperienceDataSource()
    );
    const skillRepository = new SkillRepositoryImpl(
        new SupabaseSkillDataSource()
    );
    const projectRepository = new ProjectRepositoryImpl(
        new SupabaseProjectDataSource()
    );
    const certificateRepository = new CertificateRepositoryImpl(
        new SupabaseCertificateDataSource()
    );

    return {
        resolveAssetUrl: new ResolveAssetUrlUseCase(storageRepository),
        getProfile: new GetProfileUseCase(profileRepository),
        getEducation: new GetEducationUseCase(educationRepository),
        getExperiences: new GetExperiencesUseCase(experienceRepository),
        getSkills: new GetSkillsUseCase(skillRepository),
        getProjects: new GetProjectsUseCase(projectRepository),
        getCertificates: new GetCertificatesUseCase(certificateRepository),
    };
}
