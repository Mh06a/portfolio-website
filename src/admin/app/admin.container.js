/**
 * Composition root of the admin app.
 * Unlike the public site there is NO local fallback here: the admin must always
 * show and change the real database, never bundled sample data.
 */
import { SupabaseStorageDataSource } from "../../shared/data/datasources/supabase-storage.datasource.js";
import { StorageRepositoryImpl } from "../../shared/data/repositories/storage.repository.impl.js";
import { ResolveAssetUrlUseCase } from "../../shared/domain/usecases/resolve-asset-url.usecase.js";
import { UploadAssetUseCase } from "../../shared/domain/usecases/upload-asset.usecase.js";

import { SupabaseAuthDataSource } from "../../features/auth/data/datasources/supabase-auth.datasource.js";
import { AuthRepositoryImpl } from "../../features/auth/data/repositories/auth.repository.impl.js";
import { SignInUseCase } from "../../features/auth/domain/usecases/sign-in.usecase.js";
import { SignOutUseCase } from "../../features/auth/domain/usecases/sign-out.usecase.js";
import { GetCurrentAdminUseCase } from "../../features/auth/domain/usecases/get-current-admin.usecase.js";
import { AuthAdminController } from "../../features/auth/presentation/admin/auth.admin.controller.js";
import { createLoginScreen } from "../../features/auth/presentation/admin/login.screen.js";

import { SupabaseProfileDataSource } from "../../features/profile/data/datasources/supabase-profile.datasource.js";
import { ProfileRepositoryImpl } from "../../features/profile/data/repositories/profile.repository.impl.js";
import { GetProfileUseCase } from "../../features/profile/domain/usecases/get-profile.usecase.js";
import { UpdateProfileUseCase } from "../../features/profile/domain/usecases/update-profile.usecase.js";
import { ProfileAdminController } from "../../features/profile/presentation/admin/profile.admin.controller.js";
import { createProfileScreen } from "../../features/profile/presentation/admin/profile.admin.screens.js";

import { SupabaseEducationDataSource } from "../../features/education/data/datasources/supabase-education.datasource.js";
import { EducationRepositoryImpl } from "../../features/education/data/repositories/education.repository.impl.js";
import { GetEducationUseCase } from "../../features/education/domain/usecases/get-education.usecase.js";
import { CreateEducationUseCase } from "../../features/education/domain/usecases/create-education.usecase.js";
import { UpdateEducationUseCase } from "../../features/education/domain/usecases/update-education.usecase.js";
import { DeleteEducationUseCase } from "../../features/education/domain/usecases/delete-education.usecase.js";
import { EducationAdminController } from "../../features/education/presentation/admin/education.admin.controller.js";
import { createEducationScreens } from "../../features/education/presentation/admin/education.admin.screens.js";

import { SupabaseExperienceDataSource } from "../../features/experience/data/datasources/supabase-experience.datasource.js";
import { ExperienceRepositoryImpl } from "../../features/experience/data/repositories/experience.repository.impl.js";
import { GetExperiencesUseCase } from "../../features/experience/domain/usecases/get-experiences.usecase.js";
import { CreateExperienceUseCase } from "../../features/experience/domain/usecases/create-experience.usecase.js";
import { UpdateExperienceUseCase } from "../../features/experience/domain/usecases/update-experience.usecase.js";
import { DeleteExperienceUseCase } from "../../features/experience/domain/usecases/delete-experience.usecase.js";
import { ExperienceAdminController } from "../../features/experience/presentation/admin/experience.admin.controller.js";
import { createExperienceScreens } from "../../features/experience/presentation/admin/experience.admin.screens.js";

import { SupabaseSkillDataSource } from "../../features/skills/data/datasources/supabase-skill.datasource.js";
import { SkillRepositoryImpl } from "../../features/skills/data/repositories/skill.repository.impl.js";
import { GetSkillsUseCase } from "../../features/skills/domain/usecases/get-skills.usecase.js";
import { CreateSkillUseCase } from "../../features/skills/domain/usecases/create-skill.usecase.js";
import { UpdateSkillUseCase } from "../../features/skills/domain/usecases/update-skill.usecase.js";
import { DeleteSkillUseCase } from "../../features/skills/domain/usecases/delete-skill.usecase.js";
import { SkillsAdminController } from "../../features/skills/presentation/admin/skills.admin.controller.js";
import { createSkillsScreens } from "../../features/skills/presentation/admin/skills.admin.screens.js";

import { SupabaseProjectDataSource } from "../../features/projects/data/datasources/supabase-project.datasource.js";
import { ProjectRepositoryImpl } from "../../features/projects/data/repositories/project.repository.impl.js";
import { GetProjectsUseCase } from "../../features/projects/domain/usecases/get-projects.usecase.js";
import { GetTechnologiesUseCase } from "../../features/projects/domain/usecases/get-technologies.usecase.js";
import { CreateProjectUseCase } from "../../features/projects/domain/usecases/create-project.usecase.js";
import { UpdateProjectUseCase } from "../../features/projects/domain/usecases/update-project.usecase.js";
import { DeleteProjectUseCase } from "../../features/projects/domain/usecases/delete-project.usecase.js";
import { ProjectsAdminController } from "../../features/projects/presentation/admin/projects.admin.controller.js";
import { createProjectsScreens } from "../../features/projects/presentation/admin/projects.admin.screens.js";

import { SupabaseCertificateDataSource } from "../../features/certificates/data/datasources/supabase-certificate.datasource.js";
import { CertificateRepositoryImpl } from "../../features/certificates/data/repositories/certificate.repository.impl.js";
import { GetCertificatesUseCase } from "../../features/certificates/domain/usecases/get-certificates.usecase.js";
import { CreateCertificateUseCase } from "../../features/certificates/domain/usecases/create-certificate.usecase.js";
import { UpdateCertificateUseCase } from "../../features/certificates/domain/usecases/update-certificate.usecase.js";
import { DeleteCertificateUseCase } from "../../features/certificates/domain/usecases/delete-certificate.usecase.js";
import { CertificatesAdminController } from "../../features/certificates/presentation/admin/certificates.admin.controller.js";
import { createCertificatesScreens } from "../../features/certificates/presentation/admin/certificates.admin.screens.js";

import { OverviewAdminController } from "../../features/overview/presentation/admin/overview.admin.controller.js";
import { createOverviewScreen } from "../../features/overview/presentation/admin/overview.admin.screens.js";

export function createAdminApp() {
    // ---- shared
    const storage = new StorageRepositoryImpl(new SupabaseStorageDataSource());
    const uploadAsset = new UploadAssetUseCase(storage);
    const resolveAsset = new ResolveAssetUrlUseCase(storage);
    const assets = { resolveAssetUrl: path => resolveAsset.execute(path) };

    // ---- repositories (Supabase only)
    const authRepository = new AuthRepositoryImpl(new SupabaseAuthDataSource());
    const profileRepository = new ProfileRepositoryImpl(new SupabaseProfileDataSource());
    const educationRepository = new EducationRepositoryImpl(new SupabaseEducationDataSource());
    const experienceRepository = new ExperienceRepositoryImpl(new SupabaseExperienceDataSource());
    const skillRepository = new SkillRepositoryImpl(new SupabaseSkillDataSource());
    const projectRepository = new ProjectRepositoryImpl(new SupabaseProjectDataSource());
    const certificateRepository = new CertificateRepositoryImpl(new SupabaseCertificateDataSource());

    // ---- use cases
    const getProfile = new GetProfileUseCase(profileRepository);
    const getEducation = new GetEducationUseCase(educationRepository);
    const getExperiences = new GetExperiencesUseCase(experienceRepository);
    const getSkills = new GetSkillsUseCase(skillRepository);
    const getProjects = new GetProjectsUseCase(projectRepository);
    const getCertificates = new GetCertificatesUseCase(certificateRepository);

    // ---- controllers
    const auth = new AuthAdminController({
        signIn: new SignInUseCase(authRepository),
        signOut: new SignOutUseCase(authRepository),
        getCurrentAdmin: new GetCurrentAdminUseCase(authRepository),
    });

    const overview = new OverviewAdminController({ getProjects, getSkills, getExperiences, getCertificates, getEducation });

    const profile = new ProfileAdminController({
        getProfile,
        updateProfile: new UpdateProfileUseCase(profileRepository),
        uploadAsset,
    });

    const education = new EducationAdminController({
        getAll: getEducation,
        create: new CreateEducationUseCase(educationRepository),
        update: new UpdateEducationUseCase(educationRepository),
        remove: new DeleteEducationUseCase(educationRepository),
    }, { uploadAsset });

    const experience = new ExperienceAdminController({
        getAll: getExperiences,
        create: new CreateExperienceUseCase(experienceRepository),
        update: new UpdateExperienceUseCase(experienceRepository),
        remove: new DeleteExperienceUseCase(experienceRepository),
    });

    const skills = new SkillsAdminController({
        getAll: getSkills,
        create: new CreateSkillUseCase(skillRepository),
        update: new UpdateSkillUseCase(skillRepository),
        remove: new DeleteSkillUseCase(skillRepository),
    });

    const projects = new ProjectsAdminController({
        getAll: getProjects,
        create: new CreateProjectUseCase(projectRepository),
        update: new UpdateProjectUseCase(projectRepository),
        remove: new DeleteProjectUseCase(projectRepository),
    }, { getTechnologies: new GetTechnologiesUseCase(projectRepository), uploadAsset });

    const certificates = new CertificatesAdminController({
        getAll: getCertificates,
        create: new CreateCertificateUseCase(certificateRepository),
        update: new UpdateCertificateUseCase(certificateRepository),
        remove: new DeleteCertificateUseCase(certificateRepository),
    }, { uploadAsset });

    // ---- screens → route table
    const educationScreens = createEducationScreens(education, assets);
    const experienceScreens = createExperienceScreens(experience);
    const skillScreens = createSkillsScreens(skills);
    const projectScreens = createProjectsScreens(projects, assets);
    const certificateScreens = createCertificatesScreens(certificates, assets);

    const routes = [
        { path: "/login", public: true, screen: createLoginScreen(auth) },

        { path: "/", nav: "overview", screen: createOverviewScreen(overview) },
        { path: "/profile", nav: "profile", screen: createProfileScreen(profile, assets) },

        { path: "/education", nav: "education", screen: educationScreens.list },
        { path: "/education/:id", nav: "education", screen: educationScreens.form },
        { path: "/experience", nav: "experience", screen: experienceScreens.list },
        { path: "/experience/:id", nav: "experience", screen: experienceScreens.form },
        { path: "/skills", nav: "skills", screen: skillScreens.list },
        { path: "/skills/:id", nav: "skills", screen: skillScreens.form },
        { path: "/projects", nav: "projects", screen: projectScreens.list },
        { path: "/projects/:id", nav: "projects", screen: projectScreens.form },
        { path: "/certificates", nav: "certificates", screen: certificateScreens.list },
        { path: "/certificates/:id", nav: "certificates", screen: certificateScreens.form },
    ];

    return { routes, auth };
}
