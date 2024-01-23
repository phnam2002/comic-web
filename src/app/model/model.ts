import { Observable } from "rxjs";

export interface NgParam {
        key: string;
        value: string;
      }

export class BaseResponse<T> {
        [x: string]: any;
        errorCode?: string;
        errorMessage?: string;
        data?: T;
}

export class BaseResponse1<T> {
        [x: string]: any;
        errorCode?: string;
        errorMessage?: string;
        data?: T[];
}

export class PagesRequest {
        curentPage = 0;
        size = 20;
        sort: string | undefined;
}

export class BasePagingResponse<T> {
        errorCode?: string;
        errorMessage?: string;
        data?: PageResponse<T>;
}

export class PageResponse<T> {
        first: boolean = false;
        last: boolean = false;
        totalPages?: number;
        totalElements?: number;
        size?: number;
        number?: number;
        numberOfElements?: number;
        content?: T[];
}

export class LoginRequest {
        username: string | undefined;
        password: string | undefined;
}

export class LoginResponse {
        errorCode: string | undefined;
        message: string | undefined;
        status:boolean | undefined;
        // token: string | undefined;
        // type: string | undefined;
        // refreshToken: string | undefined;
        id: number | undefined;
        username: string | undefined;
        fullname: string | undefined;
        email: string | undefined;
        role: string | undefined;
}


export class Comic {
        id?: number;
        code: string | undefined;
        name: string | undefined;
        type: string | undefined;
        description: string | undefined;
        author: string | undefined;
        image: any | undefined;
        status: string | undefined;
        publishedAt: Date | undefined;
        chapter: Chapter[] | undefined;
        updatedAt: Date | undefined;
        viewCount: number | undefined;
}

// export class Comic1 {
//         id?: number;
//         code: string | undefined;
//         name: string | undefined;
//         type: string | undefined;
// }

export class ComicSearchRequest {
        id?: number;
        name: string | undefined;
        type: string | undefined;
        author: string | undefined;
        status: string | undefined;
        publishedAt: Date | undefined;
}

export class Chapter {
        id?: number;
        chap?: number | undefined;
        title: string | undefined;
        updatedAt: Date | undefined;
        viewCount: number | undefined;
        content_Path: string | undefined;
}

export class ChapterResponse {
        id?: number;
        chap?: number | undefined;
        title: string | undefined;
        updatedAt: Date | undefined;
        viewCount: number | undefined;
        contentPath: string | undefined;
        comic: Comic | undefined;
}

export class ChapterSearchRequest {
        id?: number | undefined;
        chap?: number | undefined;
        title: string | undefined;
        updatedAt: Date | undefined;
        comic: Comic | undefined;
}

export class User{
        id?:number;
        userName?: string;
        fullName?:string;
        birthday?:string;
        phoneNumber?:string;
        role?:string;
}

export class TypeComic{
        id?: number | undefined;
        name: string | undefined;
        description: string | undefined;
}

