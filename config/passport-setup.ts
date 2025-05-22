import passport, { type Profile } from 'passport';
import {Strategy as GoogleStrategy, type VerifyCallback } from 'passport-google-oauth20';
import { connectToDatabase } from '../db';
import { ExplainVerbosity, ObjectId } from 'mongodb';
import {type User } from '../types/User';



passport.serializeUser((user: Express.User, done)=>{
    const u = user as User;
    done(null, u._id?.toString());
})
passport.deserializeUser(async (id : string, done)=>{
    try {
        const db = await connectToDatabase();
        const user = await db.collection<User>('users').findOne({ _id: new ObjectId(id) });
        if (!user) {
            return done(new Error('User not found'), null);
        }
        done(null, user);
    } catch (error) {
        done(error, null);
    }
} );


function getSafeProfileInfo(profile: Profile): { email: string; photo: string } {
    const email = profile.emails?.[0]?.value;
    const photo = profile.photos?.[0]?.value;
  
    if (!email || !photo) {
      throw new Error('Missing email or photo in Google profile');
    }
  
    return { email, photo };
  }


passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback',
        proxy: true
    },
    async(_accessToken : string, _refreshToken: string, profile: Profile, done : VerifyCallback) => {
        try {
            const db = await connectToDatabase();
            const userCollection = db?.collection<User>('users');
            if (!userCollection) {
                throw new Error('User collection not found');
            }
            const existingUser = await userCollection.findOne({ googleId: profile.id });

            if(existingUser){
                const userData = {
                    ...existingUser,
                    lastLogin: new Date(),
                }
                
                await userCollection.updateOne(
                    {_id: existingUser._id},
                    {$set: {lastLogin: new Date()}},
                );

                console.log("User logged in with ID: ", existingUser._id.toString());
                return done(null, userData);
            };

            const { email, photo } = getSafeProfileInfo(profile);

            const newUser : User = {
                googleId: profile.id,
                email: email,
                name: profile.displayName,
                picture: photo,
                xp: 0,
                level: 1,
                taskCompleted: 0,
                tasks: [],
                completedTasks: [],
                unlockdBatches: [],
                isOptIn: false,
                createdAt: new Date(),
                lastLogin: new Date(),  
            };

            const result = await userCollection.insertOne(newUser);
            newUser._id = result.insertedId;

            console.log("New user created with ID: ", newUser._id.toString());
            console.log("User", newUser);
            

            return done(null, newUser);
            

        } catch (error) {
            return done(error as Error);
        }
    }
)
);


export default passport;