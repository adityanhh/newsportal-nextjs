import { NextApiRequest, NextApiResponse } from 'next';

export const login = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    // Implementasikan logika login di sini
    // Contoh sederhana:
    if (email === 'user@example.com' && password === 'password') {
      res.status(200).json({ message: 'Login berhasil' });
    } else {
      res.status(401).json({ message: 'Email atau password salah' });
    }
  } else {
    res.status(405).json({ message: 'Metode tidak diizinkan' });
  }
};

export const register = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    // Implementasikan logika registrasi di sini
    // Contoh sederhana:
    // Anggap saja registrasi selalu berhasil
    res.status(201).json({ message: 'Registrasi berhasil' });
  } else {
    res.status(405).json({ message: 'Metode tidak diizinkan' });
  }
};