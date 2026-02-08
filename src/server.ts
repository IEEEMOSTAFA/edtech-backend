import "dotenv/config";
import app from "./app";
import { prisma } from "./lib/prisma";

const PORT = process.env.PORT || 5000;

async function main() {
  try {
    await prisma.$connect();
    console.log("✅ Database connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server failed to start", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();




























// import { prisma } from "./lib/prisma";
// import app from "./app"
// import 'dotenv/config';
// const PORT = process.env.PORT || 5000

// async function main() {
//     try{
//        await prisma.$connect();
//        console.log("Connected to the database Successfully");

//        app.listen(PORT,() =>{
//         console.log(`Server is running on http://localhost:5000 `)
//        })
//     }
//     catch(error){
//          console.error("An error Occured",error);
//          await prisma.$disconnect();
//          process.exit(1);
//     }
    
// }

// main();









// // import { prisma } from "./lib/prisma";
// // import app from "./app";
// // import "dotenv/config";

// // const PORT = process.env.PORT || 5000;

// // async function main() {
// //   try {
// //     // Connect to database
// //     await prisma.$connect();
// //     console.log("✅ Connected to database");

// //     // Start server
// //     app.listen(PORT, () => {
// //       console.log(`🚀 Server running at http://localhost:${PORT}`);
// //       console.log(`📚 API: http://localhost:${PORT}/api`);
// //     });
// //   } catch (error) {
// //     console.error("❌ Connection error:", error);
// //     await prisma.$disconnect();
// //     process.exit(1);
// //   }
// // }

// // main();