import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { compare } from "bcryptjs";

export async function POST(req) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return new Response(JSON.stringify({ message: "Data tidak lengkap" }), { status: 400 });
  }

  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", username));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return new Response(JSON.stringify({ message: "User tidak ditemukan" }), { status: 404 });
    }

    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();

    const isMatch = await compare(password, userData.password);

    if (!isMatch) {
      return new Response(JSON.stringify({ message: "Password salah" }), { status: 401 });
    }

    // ✅ Tambahkan uid dari dokumen ID agar bisa digunakan oleh useAuth()
    return new Response(JSON.stringify({
      message: "Login berhasil",
      user: {
        uid: userDoc.id,             // ID dokumen dari Firestore
        username: userData.username,
        role: userData.role,
        // bisa tambahkan field lain jika diperlukan
      }
    }), {
      status: 200,
    });

  } catch (err) {
    console.error("Login error:", err);
    return new Response(JSON.stringify({ message: "Terjadi kesalahan server" }), { status: 500 });
  }
}
