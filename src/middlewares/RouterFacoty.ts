import { Application, Router } from "express";
import expressAsyncHandler from "express-async-handler";
import authMiddleware from "./AuthMiddlaware";

export function RouterFactory(routeConfig: RouterFactoryDTO[], router: Router): void {
	routeConfig.forEach(route => {
		const controller = expressAsyncHandler(route.controller);

		switch (route.method) {
			case "get":
				router.get(route.path, controller);
				break;
			case "get-jwt":
				router.get(route.path, authMiddleware, controller);
				break;
			case "post":
				router.post(route.path, controller);
				break;
			case "post-jwt":
				router.post(route.path, authMiddleware, controller);
				break;
			case "put":
				router.put(route.path, controller);
				break;
			case "put-jwt":
				router.put(route.path, authMiddleware, controller);
				break;
			case "delete":
				router.delete(route.path, controller);
				break;
		}
	});
}

export interface RouterFactoryDTO {
	method: "get" | "post" | "put" | "delete" | "post-jwt" | "get-jwt" | "put-jwt";
	path: string,
	controller: Application | any
}