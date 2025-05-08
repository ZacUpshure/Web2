export interface CreateDegreeCourseDto {
    courseID: string;
    name: string;
    universityShortName: string;
}

export interface UpdateDegreeCourseDto {
    name?: string;
    universityShortName?: string;
}

export interface DegreeCourseResponseDto {
    courseID: string;
    name: string;
    universityShortName: string;
}
