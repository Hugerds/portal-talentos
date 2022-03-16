import { getCustomRepository } from "typeorm";
import { Candidate } from "../models/CandidateModel";
import { City } from "../models/CityModel";
import { State } from "../models/StateModel";
import { CityRepository } from "../repositories/CityRepository";
import { AddressRepository } from "../repositories/AddressRepository";
import { StateRepository } from "../repositories/StateRepository";
import { CandidateRepository } from "../repositories/CandidateRepository";
import { SkillRepository } from "../repositories/SkillRepository";
import { CourseRepository } from "../repositories/CourseRepository";
import { InstitutionRepository } from "../repositories/InstitutionRepository";
import { Course } from "../models/CourseModel";
import { Institution } from "../models/InstitutionModel";
import { FormationRepository } from "../repositories/FormationRepository";

export class CourseService {
    candidateRepository = getCustomRepository(CandidateRepository);
    addressRepository = getCustomRepository(AddressRepository);
    stateRepository = getCustomRepository(StateRepository);
    skillRepository = getCustomRepository(SkillRepository);
    cityRepository = getCustomRepository(CityRepository);
    courseRepository = getCustomRepository(CourseRepository);
    institutionRepository = getCustomRepository(InstitutionRepository);
    formationRepository = getCustomRepository(FormationRepository);
    async createCourse(courseProps: Partial<Course>): Promise<Course> {
        try {
            courseProps.updateDate = new Date();
            const course = this.courseRepository.createCourse(courseProps);
            return course;
        } catch (error) {
            console.log(error);
        }
    }

    async updateCourse(courseProps: Partial<Course>): Promise<Course> {
        try {
            courseProps.updateDate = new Date();
            const course = await this.courseRepository.createCourse(courseProps);
            return course;
        } catch (error) {
            console.log(error);
        }
    }
}