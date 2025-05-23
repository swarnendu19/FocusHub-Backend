import type { NextFunction, Request, Response } from "express";
import type { RequestHandler } from "express";

const authenticateToken: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated) {
    console.log("Auth failed: Session invalid or expired");
    res.status(401).json({ error: "Session expired or invalid" });
    return;
  }

  console.log("Auth Successful - User:", req.user?._id);
  next();
};

const verifyOwnership: RequestHandler = (req: Request, res: Response,next: NextFunction )=>{
    if(req.user?._id !== req.params._id){
      res.status(403).json({ error: 'Unauthorized access' });
      return;
    }
    next();
} 

export {
  authenticateToken,
  verifyOwnership
};
