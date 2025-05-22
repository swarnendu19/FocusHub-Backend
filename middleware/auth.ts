import type { NextFunction, Request, Response } from "express";

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated) {
    console.log("Auth failed: Session invalid or expired");
    return res.status(401).json({ error: "Session expired or invalid" });
  }

  console.log("Auth Successful - User:", req.user?._id);
  next();
};

const verifyOwnership = (req: Request, res: Response,next: NextFunction )=>{
    if(req.user?._id !== req.params._id){
        return res.status(403).json({ error: 'Unauthorized access' });
    }
    next();
} 

export {
  authenticateToken,
  verifyOwnership
};
