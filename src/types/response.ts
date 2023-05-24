import { response } from "~/server/helpers";

export type Response<T = any> = ReturnType<typeof response<T>>;
