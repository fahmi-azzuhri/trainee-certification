// Class Pegawai
class Pegawai {
  constructor(nip, nama, tahunMasuk, gajiPokok) {
    this.nip = nip;
    this.nama = nama;
    this.tahunMasuk = tahunMasuk;
    this.gajiPokok = gajiPokok;
  }

  // Metode untuk menghitung gaji akhir
  hitungGaji() {
    return this.gajiPokok;
  }
}

// Class Satpam yang merupakan turunan dari Pegawai
class Satpam extends Pegawai {
  constructor(nip, nama, tahunMasuk, gajiPokok, jamLembur) {
    super(nip, nama, tahunMasuk, gajiPokok);
    this.jamLembur = jamLembur;
  }

  // Override metode hitungGaji()
  hitungGaji() {
    const honorLembur = this.jamLembur * 20000;
    return this.gajiPokok + honorLembur;
  }
}

// Class Sales yang merupakan turunan dari Pegawai
class Sales extends Pegawai {
  constructor(nip, nama, tahunMasuk, gajiPokok, jumlahPelanggan) {
    super(nip, nama, tahunMasuk, gajiPokok);
    this.jumlahPelanggan = jumlahPelanggan;
  }

  // Override metode hitungGaji()
  hitungGaji() {
    const komisi = this.jumlahPelanggan * 50000;
    return this.gajiPokok + komisi;
  }
}

// Class Administrasi yang merupakan turunan dari Pegawai
class Administrasi extends Pegawai {
  constructor(nip, nama, tahunMasuk, gajiPokok, lamaKerja) {
    super(nip, nama, tahunMasuk, gajiPokok);
    this.lamaKerja = lamaKerja;
  }

  // Override metode hitungGaji()
  hitungGaji() {
    let tunjangan = 0;
    if (this.lamaKerja >= 5) {
      tunjangan = this.gajiPokok * 0.03;
    } else if (this.lamaKerja >= 3) {
      tunjangan = this.gajiPokok * 0.01;
    }
    return this.gajiPokok + tunjangan;
  }
}

// Class Manajer yang merupakan turunan dari Pegawai
class Manajer extends Pegawai {
  constructor(nip, nama, tahunMasuk, gajiPokok, peningkatanPenjualan) {
    super(nip, nama, tahunMasuk, gajiPokok);
    this.peningkatanPenjualan = peningkatanPenjualan;
  }

  // Override metode hitungGaji()
  hitungGaji() {
    let bonus = 0;
    if (this.peningkatanPenjualan > 10) {
      bonus = this.gajiPokok * 0.1;
    } else if (
      this.peningkatanPenjualan >= 6 &&
      this.peningkatanPenjualan <= 10
    ) {
      bonus = this.gajiPokok * 0.05;
    } else if (
      this.peningkatanPenjualan >= 1 &&
      this.peningkatanPenjualan <= 5
    ) {
      bonus = this.gajiPokok * 0.02;
    }
    return this.gajiPokok + bonus;
  }
}

// Contoh penggunaan class dan objek
const satpam = new Satpam("123", "Satpam A", 2010, 5000000, 10);
const sales = new Sales("456", "Sales B", 2015, 4000000, 20);
const admin = new Administrasi("789", "Admin C", 2018, 3000000, 4);
const manajer = new Manajer("999", "Manajer D", 2019, 6000000, 12);

console.log(satpam.hitungGaji()); // Output: 5200000
console.log(sales.hitungGaji()); // Output: 5000000
console.log(admin.hitungGaji()); // Output: 3030000
console.log(manajer.hitungGaji()); // Output: 6600000
