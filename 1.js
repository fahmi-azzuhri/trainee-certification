const readline = require("readline");
const fs = require("fs");

// Fungsi untuk membaca data dari keyboard
function readInput(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

// Fungsi untuk menu pilihan
async function main() {
  let isRunning = true;
  const angkaArr = [];

  console.log("=== TAMPIL HASIL PENGURUTAN ===");

  while (isRunning) {
    console.log("\nMENU PILIHAN:");
    console.log("1. Input angka");
    console.log("2. Tampil hasil pengurutan");
    console.log("3. Selesai");

    const pilihan = await readInput("Masukkan pilihan menu: ");

    switch (pilihan) {
      case "1":
        const jumlahAngka = parseInt(
          await readInput("Masukkan jumlah angka yang akan diinput: ")
        );
        for (let i = 1; i <= jumlahAngka; i++) {
          const angka = parseFloat(await readInput(`Masukkan angka ke-${i}: `));
          angkaArr.push(angka);
        }
        console.log("Data angka telah diinput.");
        break;
      case "2":
        if (angkaArr.length === 0) {
          console.log("Belum ada data angka yang diinput.");
        } else {
          console.log("Data sebelum diurutkan:", angkaArr);
          bubbleSort(angkaArr);
          console.log("Data setelah diurutkan:", angkaArr);

          const fileContent = angkaArr.join(", ");
          fs.writeFile("hasil_pengurutan.txt", fileContent, (err) => {
            if (err) throw err;
            console.log(
              "Hasil pengurutan telah disimpan dalam file hasil_pengurutan.txt"
            );
          });
        }
        break;
      case "3":
        isRunning = false;
        console.log("Program selesai.");
        break;
      default:
        console.log("Pilihan menu tidak valid.");
        break;
    }
  }
}

// Prosedur pengurutan data dengan algoritma bubble sort
function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
      }
    }
  }
}

// Fungsi untuk menukar data pada indeks ke-i dan ke-j dalam array
function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// Jalankan program utama
main();
