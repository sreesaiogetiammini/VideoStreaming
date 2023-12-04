import { PrismaClient } from "@prisma/client";



const client = global.prismadb || new PrismaClient();
if(process.env.NODE_ENV === 'production'){
    global.prismadb = client;
}

export default client;

// Why We are doing this ?
// This is because of Next.js hot preloading that means on every code change out code reruns and 
// This will create bunch of PrismaClient() instances and then we can get error saying too many PrismaClient()
// instances so to avoid this we are using this trick , by saving PrismaClient in global files and global files we dont preload