
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore,collection,doc,getDocs,getDoc } from "firebase/firestore/lite"

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const vansCollectionRef = collection(db, "vans")

export async function getVans() {

    try{

    
    const snapshot = await getDocs(vansCollectionRef)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
   } catch (error) {
    console.error("Error fetching vans:", error);
    throw new Error("Failed to fetch vans.");
  }
}

export async function getVan(id) {
    try {
        const docRef = doc(db, "vans", id);
        const snapshot = await getDoc(docRef);
        if (!snapshot.exists()) {
          throw new Error(`No such document with ID ${id}`);
        }
        return {
          ...snapshot.data(),
          id: snapshot.id
        };
      } catch (error) {
        console.error("Error fetching van:", error);
        throw new Error("Failed to fetch van.");
      }
    }


// export async function getVans(id) {
//     const url = id ? `/api/vans/${id}` : "/api/vans"
//     const res = await fetch(url)
//     if (!res.ok) {
//         throw {
//             message: "Failed to fetch vans",
//             statusText: res.statusText,
//             status: res.status
//         }
//     }
//     const data = await res.json()
//     return data.vans
// }

export async function getHostVans(id) { 
    try {
        const snapshot = await getDocs(vansCollectionRef);
        const vans = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));
        return vans;
      } catch (error) {
        console.error("Error fetching host vans:", error);
        throw new Error("Failed to fetch host vans.");
      }
    }
// export async function getHostVans(id) {
//     const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
//     const res = await fetch(url)
//     if (!res.ok) {
//         throw {
//             message: "Failed to fetch vans",
//             statusText: res.statusText,
//             status: res.status
//         }
//     }
//     const data = await res.json()
//     return data.vans
// }

export async function loginUser(creds) {
    try {
    const res = await fetch("/api/login",
        { 
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify(creds) 
        }
    )
    const data = await res.json()

    if (!res.ok) {
        throw new Error(data.message || "Failed to login.");
      }
      return data;
    } catch (error) {
      console.error("Error logging in:", error);
      throw new Error("Failed to login.");
    }
}