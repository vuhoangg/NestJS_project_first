export const ADMIN_ROLE = "SUPER ADMIN";
export const USER_ROLE = "NORMAL USER";

export const INIT_PERMISSIONS = [
    {
        "_id": "67a3163fe6ba7d3c51d10f3d",
        "name": "Create Company",
        "apiPath": "/api/v1/companies",
        "method": "POST",
        "module": "COMPANIES",
        "isDeleted": false,
        "createdBy": {
            "_id": "67a313df5edb0b771b1e54f8",
            "email": "admin02@gmail.com"
        },
        "deletedAt": null,
        "createdAt": "2025-02-05T07:41:51.448Z",
        "updatedAt": "2025-02-05T07:41:51.448Z",
        "__v": 0
    },
    {
        "_id": "67a3169ce6ba7d3c51d10f40",
        "name": "Get All Company with pagination",
        "apiPath": "/api/v1/companies",
        "method": "GET",
        "module": "COMPANIES",
        "isDeleted": false,
        "createdBy": {
            "_id": "67a313df5edb0b771b1e54f8",
            "email": "admin02@gmail.com"
        },
        "deletedAt": null,
        "createdAt": "2025-02-05T07:43:24.405Z",
        "updatedAt": "2025-02-05T07:43:24.405Z",
        "__v": 0
    },
    {
        "_id": "67a316cde6ba7d3c51d10f43",
        "name": "Get Company By Id ",
        "apiPath": "/api/v1/companies/:id",
        "method": "GET",
        "module": "COMPANIES",
        "isDeleted": false,
        "createdBy": {
            "_id": "67a313df5edb0b771b1e54f8",
            "email": "admin02@gmail.com"
        },
        "deletedAt": null,
        "createdAt": "2025-02-05T07:44:13.724Z",
        "updatedAt": "2025-02-05T07:44:13.724Z",
        "__v": 0
    },
    {
        "_id": "67a316ebe6ba7d3c51d10f46",
        "name": "Update Company By Id",
        "apiPath": "api/v1/companies/:id",
        "method": "PATCH",
        "module": "COMPANIES",
        "isDeleted": false,
        "createdBy": {
            "_id": "67a313df5edb0b771b1e54f8",
            "email": "admin02@gmail.com"
        },
        "deletedAt": null,
        "createdAt": "2025-02-05T07:44:43.175Z",
        "updatedAt": "2025-02-05T07:58:31.438Z",
        "__v": 0,
        "updatedBy": {
            "_id": "67a313df5edb0b771b1e54f8",
            "email": "admin02@gmail.com"
        }
    },
    {
        "_id": "67a31722e6ba7d3c51d10f49",
        "name": "Delete Company By Id",
        "apiPath": "api/v1/companies/:id",
        "method": "DELETE",
        "module": "COMPANIES",
        "isDeleted": false,
        "createdBy": {
            "_id": "67a313df5edb0b771b1e54f8",
            "email": "admin02@gmail.com"
        },
        "deletedAt": null,
        "createdAt": "2025-02-05T07:45:38.722Z",
        "updatedAt": "2025-02-05T08:00:21.310Z",
        "__v": 0,
        "updatedBy": {
            "_id": "67a313df5edb0b771b1e54f8",
            "email": "admin02@gmail.com"
        }
    },
    {
        "_id": "67a31b7fe6ba7d3c51d10f51",
        "name": "Create User",
        "apiPath": "/api/v1/users",
        "method": "POST",
        "module": "USERS",
        "isDeleted": false,
        "createdBy": {
            "_id": "67a313df5edb0b771b1e54f8",
            "email": "admin02@gmail.com"
        },
        "deletedAt": null,
        "createdAt": "2025-02-05T08:04:15.248Z",
        "updatedAt": "2025-02-05T08:04:15.248Z",
        "__v": 0
    },
    {
        "_id": "67a31bbae6ba7d3c51d10f54",
        "name": "GET ALL User with pagination",
        "apiPath": "/api/v1/users",
        "method": "GET",
        "module": "USERS",
        "isDeleted": false,
        "createdBy": {
            "_id": "67a313df5edb0b771b1e54f8",
            "email": "admin02@gmail.com"
        },
        "deletedAt": null,
        "createdAt": "2025-02-05T08:05:14.247Z",
        "updatedAt": "2025-02-05T08:05:14.247Z",
        "__v": 0
    },
    {
        "_id": "67a31bd2e6ba7d3c51d10f57",
        "name": "Get User By Id",
        "apiPath": "/api/v1/users/:id",
        "method": "GET",
        "module": "USERS",
        "isDeleted": false,
        "createdBy": {
            "_id": "67a313df5edb0b771b1e54f8",
            "email": "admin02@gmail.com"
        },
        "deletedAt": null,
        "createdAt": "2025-02-05T08:05:38.687Z",
        "updatedAt": "2025-02-05T08:05:38.687Z",
        "__v": 0
    },
    {
        "_id": "67a31bf0e6ba7d3c51d10f5a",
        "name": "Update User By Id",
        "apiPath": "/api/v1/users/:id",
        "method": "UPDATE",
        "module": "USERS",
        "isDeleted": false,
        "createdBy": {
            "_id": "67a313df5edb0b771b1e54f8",
            "email": "admin02@gmail.com"
        },
        "deletedAt": null,
        "createdAt": "2025-02-05T08:06:08.880Z",
        "updatedAt": "2025-02-05T08:06:08.880Z",
        "__v": 0
    },
    {
        "_id": "67a31c09e6ba7d3c51d10f5d",
        "name": "Delete User By Id",
        "apiPath": "/api/v1/users/:id",
        "method": "DELETE",
        "module": "USERS",
        "isDeleted": false,
        "createdBy": {
            "_id": "67a313df5edb0b771b1e54f8",
            "email": "admin02@gmail.com"
        },
        "deletedAt": null,
        "createdAt": "2025-02-05T08:06:33.114Z",
        "updatedAt": "2025-02-05T08:06:33.114Z",
        "__v": 0
    },
    {
        "_id": "67a31dcce6ba7d3c51d10f60",
        "name": "Create Jobs",
        "apiPath": "/api/v1/jobs",
        "method": "POST",
        "module": "JOBS",
        "isDeleted": false,
        "createdBy": {
            "_id": "67a313df5edb0b771b1e54f8",
            "email": "admin02@gmail.com"
        },
        "deletedAt": null,
        "createdAt": "2025-02-05T08:14:04.730Z",
        "updatedAt": "2025-02-05T08:14:04.730Z",
        "__v": 0
    },
    {
        "_id": "67a31e14e6ba7d3c51d10f63",
        "name": "Get all job with pagination",
        "apiPath": "/api/v1/jobs",
        "method": "GET",
        "module": "JOBS",
        "isDeleted": false,
        "createdBy": {
            "_id": "67a313df5edb0b771b1e54f8",
            "email": "admin02@gmail.com"
        },
        "deletedAt": null,
        "createdAt": "2025-02-05T08:15:16.250Z",
        "updatedAt": "2025-02-05T08:15:16.250Z",
        "__v": 0
    },
    {
        "_id": "67a31e2fe6ba7d3c51d10f66",
        "name": "Get job By Id",
        "apiPath": "/api/v1/jobs/:",
        "method": "GET",
        "module": "JOBS",
        "isDeleted": false,
        "createdBy": {
            "_id": "67a313df5edb0b771b1e54f8",
            "email": "admin02@gmail.com"
        },
        "deletedAt": null,
        "createdAt": "2025-02-05T08:15:43.678Z",
        "updatedAt": "2025-02-05T08:15:43.678Z",
        "__v": 0
    },
    {
        "_id": "67a31e4de6ba7d3c51d10f69",
        "name": "Update job By Id",
        "apiPath": "/api/v1/jobs/:id",
        "method": "UPDATE",
        "module": "JOBS",
        "isDeleted": false,
        "createdBy": {
            "_id": "67a313df5edb0b771b1e54f8",
            "email": "admin02@gmail.com"
        },
        "deletedAt": null,
        "createdAt": "2025-02-05T08:16:13.227Z",
        "updatedAt": "2025-02-05T08:16:13.227Z",
        "__v": 0
    },
    {
        "_id": "67a31e6fe6ba7d3c51d10f6c",
        "name": "Delete job By Id",
        "apiPath": "/api/v1/jobs/:id",
        "method": "DELETE",
        "module": "JOBS",
        "isDeleted": false,
        "createdBy": {
            "_id": "67a313df5edb0b771b1e54f8",
            "email": "admin02@gmail.com"
        },
        "deletedAt": null,
        "createdAt": "2025-02-05T08:16:47.823Z",
        "updatedAt": "2025-02-05T08:16:47.823Z",
        "__v": 0
    },
    {
        "_id": "67a31ecbe6ba7d3c51d10f6f",
        "name": "Create Resume",
        "apiPath": "/api/v1/resumes",
        "method": "POST",
        "module": "RESUMES",
        "isDeleted": false,
        "createdBy": {
            "_id": "67a313df5edb0b771b1e54f8",
            "email": "admin02@gmail.com"
        },
        "deletedAt": null,
        "createdAt": "2025-02-05T08:18:19.710Z",
        "updatedAt": "2025-02-05T08:18:19.710Z",
        "__v": 0
    },
    {
        "_id": "67a31f0ee6ba7d3c51d10f72",
        "name": "Get all Resume with pagination",
        "apiPath": "/api/v1/resumes",
        "method": "GET",
        "module": "RESUMES",
        "isDeleted": false,
        "createdBy": {
            "_id": "67a313df5edb0b771b1e54f8",
            "email": "admin02@gmail.com"
        },
        "deletedAt": null,
        "createdAt": "2025-02-05T08:19:26.384Z",
        "updatedAt": "2025-02-05T08:19:26.384Z",
        "__v": 0
    },
    {
        "_id": "67a31f4fe6ba7d3c51d10f75",
        "name": "Get Resume By Id",
        "apiPath": "/api/v1/resumes/:id",
        "method": "GET",
        "module": "RESUMES",
        "isDeleted": false,
        "createdBy": {
            "_id": "67a313df5edb0b771b1e54f8",
            "email": "admin02@gmail.com"
        },
        "deletedAt": null,
        "createdAt": "2025-02-05T08:20:31.138Z",
        "updatedAt": "2025-02-05T08:20:31.138Z",
        "__v": 0
    },
    {
        "_id": "67a31f6de6ba7d3c51d10f78",
        "name": "Update Resume By Id",
        "apiPath": "/api/v1/resumes/:id",
        "method": "UPDATE",
        "module": "RESUMES",
        "isDeleted": false,
        "createdBy": {
            "_id": "67a313df5edb0b771b1e54f8",
            "email": "admin02@gmail.com"
        },
        "deletedAt": null,
        "createdAt": "2025-02-05T08:21:01.055Z",
        "updatedAt": "2025-02-05T08:21:01.055Z",
        "__v": 0
    },
    {
        "_id": "67a31f87e6ba7d3c51d10f7b",
        "name": "Delete Resume By Id",
        "apiPath": "/api/v1/resumes/:id",
        "method": "DELETE",
        "module": "RESUMES",
        "isDeleted": false,
        "createdBy": {
            "_id": "67a313df5edb0b771b1e54f8",
            "email": "admin02@gmail.com"
        },
        "deletedAt": null,
        "createdAt": "2025-02-05T08:21:27.377Z",
        "updatedAt": "2025-02-05T08:21:27.377Z",
        "__v": 0
    },
    {
        "_id": "67a32059b3b2beae59ca67dc",
        "name": "Create Permission ",
        "apiPath": "/api/v1/permissions",
        "method": "POST",
        "module": "PERMISSIONS",
        "isDeleted": false,
        "createdBy": {
            "_id": "67a313df5edb0b771b1e54f8",
            "email": "admin02@gmail.com"
        },
        "deletedAt": null,
        "createdAt": "2025-02-05T08:24:57.503Z",
        "updatedAt": "2025-02-05T08:24:57.503Z",
        "__v": 0
    },
    {
        "_id": "67a320cab3b2beae59ca67df",
        "name": "Get all Permission with pagination",
        "apiPath": "/api/v1/permissions",
        "method": "GET",
        "module": "PERMISSIONS",
        "isDeleted": false,
        "createdBy": {
            "_id": "67a313df5edb0b771b1e54f8",
            "email": "admin02@gmail.com"
        },
        "deletedAt": null,
        "createdAt": "2025-02-05T08:26:50.324Z",
        "updatedAt": "2025-02-05T08:26:50.324Z",
        "__v": 0
    },
    {
        "_id": "67a320e9b3b2beae59ca67e2",
        "name": "Get  Permission By id",
        "apiPath": "/api/v1/permissions/:id",
        "method": "GET",
        "module": "PERMISSIONS",
        "isDeleted": false,
        "createdBy": {
            "_id": "67a313df5edb0b771b1e54f8",
            "email": "admin02@gmail.com"
        },
        "deletedAt": null,
        "createdAt": "2025-02-05T08:27:21.938Z",
        "updatedAt": "2025-02-05T08:27:21.938Z",
        "__v": 0
    },
    {
        "_id": "67a3211fb3b2beae59ca67e5",
        "name": "Update Permission By id",
        "apiPath": "/api/v1/permissions/:id",
        "method": "UPDATE",
        "module": "PERMISSIONS",
        "isDeleted": false,
        "createdBy": {
            "_id": "67a313df5edb0b771b1e54f8",
            "email": "admin02@gmail.com"
        },
        "deletedAt": null,
        "createdAt": "2025-02-05T08:28:15.011Z",
        "updatedAt": "2025-02-05T08:28:15.011Z",
        "__v": 0
    },
    {
        "_id": "67a3213bb3b2beae59ca67e8",
        "name": "Delete Permission By id",
        "apiPath": "/api/v1/permissions/:id",
        "method": "DELETE",
        "module": "PERMISSIONS",
        "isDeleted": false,
        "createdBy": {
            "_id": "67a313df5edb0b771b1e54f8",
            "email": "admin02@gmail.com"
        },
        "deletedAt": null,
        "createdAt": "2025-02-05T08:28:43.018Z",
        "updatedAt": "2025-02-05T08:28:43.018Z",
        "__v": 0
    },
    {
        "_id": "67a3227a1ff5748d24102050",
        "name": "Create Role",
        "apiPath": "/api/v1/roles",
        "method": "POST",
        "module": "ROLES",
        "isDeleted": false,
        "createdBy": {
            "_id": "67a313df5edb0b771b1e54f8",
            "email": "admin02@gmail.com"
        },
        "deletedAt": null,
        "createdAt": "2025-02-05T08:34:02.236Z",
        "updatedAt": "2025-02-05T08:34:02.236Z",
        "__v": 0
    },
    {
        "_id": "67a322c01ff5748d24102053",
        "name": "Get all roles with pagination",
        "apiPath": "/api/v1/roles",
        "method": "GET",
        "module": "ROLES",
        "isDeleted": false,
        "createdBy": {
            "_id": "67a313df5edb0b771b1e54f8",
            "email": "admin02@gmail.com"
        },
        "deletedAt": null,
        "createdAt": "2025-02-05T08:35:12.249Z",
        "updatedAt": "2025-02-05T08:35:12.249Z",
        "__v": 0
    },
    {
        "_id": "67a322df1ff5748d24102056",
        "name": "Get roles by id ",
        "apiPath": "/api/v1/roles/:id",
        "method": "GET",
        "module": "ROLES",
        "isDeleted": false,
        "createdBy": {
            "_id": "67a313df5edb0b771b1e54f8",
            "email": "admin02@gmail.com"
        },
        "deletedAt": null,
        "createdAt": "2025-02-05T08:35:43.618Z",
        "updatedAt": "2025-02-05T08:35:43.618Z",
        "__v": 0
    },
    {
        "_id": "67a322f31ff5748d24102059",
        "name": "Update roles by id ",
        "apiPath": "/api/v1/roles/:id",
        "method": "UPDATE",
        "module": "ROLES",
        "isDeleted": false,
        "createdBy": {
            "_id": "67a313df5edb0b771b1e54f8",
            "email": "admin02@gmail.com"
        },
        "deletedAt": null,
        "createdAt": "2025-02-05T08:36:03.977Z",
        "updatedAt": "2025-02-05T08:36:03.977Z",
        "__v": 0
    },
    {
        "_id": "67a323101ff5748d2410205c",
        "name": "Delete roles by id ",
        "apiPath": "/api/v1/roles/:id",
        "method": "DELETE",
        "module": "ROLES",
        "isDeleted": false,
        "createdBy": {
            "_id": "67a313df5edb0b771b1e54f8",
            "email": "admin02@gmail.com"
        },
        "deletedAt": null,
        "createdAt": "2025-02-05T08:36:32.844Z",
        "updatedAt": "2025-02-05T08:36:32.844Z",
        "__v": 0
    },
    {
        "_id": "67a323c91ff5748d2410205f",
        "name": "Login",
        "apiPath": "/api/v1/auth/login",
        "method": "POST",
        "module": "AUTHS",
        "isDeleted": false,
        "createdBy": {
            "_id": "67a313df5edb0b771b1e54f8",
            "email": "admin02@gmail.com"
        },
        "deletedAt": null,
        "createdAt": "2025-02-05T08:39:37.347Z",
        "updatedAt": "2025-02-05T08:39:37.347Z",
        "__v": 0
    },
    {
        "_id": "67a324031ff5748d24102062",
        "name": "Register",
        "apiPath": "/api/v1/auth/register",
        "method": "POST",
        "module": "AUTHS",
        "isDeleted": false,
        "createdBy": {
            "_id": "67a313df5edb0b771b1e54f8",
            "email": "admin02@gmail.com"
        },
        "deletedAt": null,
        "createdAt": "2025-02-05T08:40:35.398Z",
        "updatedAt": "2025-02-05T08:40:35.398Z",
        "__v": 0
    },
    {
        "_id": "67a3241f1ff5748d24102065",
        "name": "LogOut",
        "apiPath": "/api/v1/auth/logout",
        "method": "POST",
        "module": "AUTHS",
        "isDeleted": false,
        "createdBy": {
            "_id": "67a313df5edb0b771b1e54f8",
            "email": "admin02@gmail.com"
        },
        "deletedAt": null,
        "createdAt": "2025-02-05T08:41:03.696Z",
        "updatedAt": "2025-02-05T08:41:03.696Z",
        "__v": 0
    },
    {
        "_id": "67a324531ff5748d24102068",
        "name": "Upload file",
        "apiPath": "/api/v1/files/upload",
        "method": "POST",
        "module": "FILES",
        "isDeleted": false,
        "createdBy": {
            "_id": "67a313df5edb0b771b1e54f8",
            "email": "admin02@gmail.com"
        },
        "deletedAt": null,
        "createdAt": "2025-02-05T08:41:55.142Z",
        "updatedAt": "2025-02-05T08:41:55.142Z",
        "__v": 0
    }
]