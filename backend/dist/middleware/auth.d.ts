import type { Request, RequestHandler } from "express";
export interface customRequest extends Request {
    user: any;
}
declare const validateUser: RequestHandler;
export default validateUser;
//# sourceMappingURL=auth.d.ts.map