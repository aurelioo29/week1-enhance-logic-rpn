class Bank {
  constructor(bankName) {
    this.bankName = bankName;
    this.account = [];
  }

  register(person, type, initialBalance) {
    if (type === "platinum") {
      if (initialBalance < 50000) {
        console.log("Saldo awal kurang dari minimum saldo yang ditentukan");
        return;
      }

      let newAccount = new Platinum(
        person.name,
        this.generateAccountNumber(),
        initialBalance
      );
      person.bankAccount = newAccount;
      this.account.push(newAccount);
      console.log(
        `Selamat datang ke ${this.bankName}, ${person.name}. Nomor Akun anda adalah ${newAccount.accountNumber}. Total saldo adalah ${initialBalance}`
      );
    } else if (type === "silver") {
      if (initialBalance < 10000) {
        console.log("Saldo awal kurang dari minimum saldo yang ditentukan");
        return;
      }

      let newAccount = new Silver(
        person.name,
        this.generateAccountNumber(),
        initialBalance
      );
      person.bankAccount = newAccount;
      this.account.push(newAccount);
      console.log(
        `Selamat datang ke ${this.bankName}, ${person.name}. Nomor Akun anda adalah ${newAccount.accountNumber}. Total saldo adalah ${initialBalance}`
      );
    }
  }

  generateAccountNumber() {
    return Math.floor(Math.random() * 10000000);
  }
}

class Person {
  constructor(name) {
    this.name = name;
    this.bankAccount = null;
  }
}

class Member {
  constructor(memberName, accountNumber, initialBalance, minimumBalance) {
    this.memberName = memberName;
    this.accountNumber = accountNumber;
    this.minimumBalance = minimumBalance;
    this.balance = initialBalance;
    this.transactions = [];
  }

  credit(amount) {
    if (amount < 10000) {
      console.log("Belum memenuhi minimal uang yang dapat di setor");
      return;
    }

    this.balance += amount;
    this.transactions.push(new Transaction(amount, "credit", "nyetor"));
    console.log("Anda sukses menyimpan uang ke dalam bank.");
  }

  debet(amount, note) {
    if (this.balance - amount < this.minimumBalance) {
      console.log(
        "Saldo minimum anda tidak terpenuhi untuk melakukan transaksi."
      );
      return
    }

    if (this.balance < amount) {
      console.log("Saldo anda tidak cukup");
      return;
    }

    this.balance -= amount;
    this.transactions.push(new Transaction(amount, "debet", note));
    console.log("Anda sukses menarik uang dari bank");
  }

  transfer(otherAccount, amount) {
    if (this.balance - amount < this.minimumBalance) {
      console.log(`Anda gagal transfer ke ${otherAccount.memberName}`);
      return;
    }

    if (this.balance < amount) {
      console.log("Saldo anda tidak cukup untuk transfer");
      return;
    }

    this.balance -= amount;
    otherAccount.balance += amount;
    this.transactions.push(
      new Transaction(
        amount,
        "debet",
        `transfer ke akun ${otherAccount.memberName}`
      )
    );
    console.log(`Anda sukses transfer ke ${otherAccount.memberName}`);
  }
}

class Platinum extends Member {
  constructor(memberName, accountNumber, initialBalance) {
    super(memberName, accountNumber, initialBalance, 50000);
    this.type = "platinum";
  }
}

class Silver extends Member {
  constructor(memberName, accountNumber, initialBalance) {
    super(memberName, accountNumber, initialBalance, 10000);
    this.type = "silver";
  }
}

class Transaction {
  constructor(nominal, status, note) {
    this.nominal = nominal;
    this.status = status;
    this.date = new Date();
    this.note = note;
  }
}

// TESTCASE
// TIDAK BOLEH MENGUBAH CODE DI BAWAH INI

let yudhistiraBank = new Bank("Yudhistira Bank");
let nadia = new Person("Nadia");

yudhistiraBank.register(nadia, "platinum", 5000);
// ! Expected: Saldo awal kurang dari minimum saldo yang ditentukan

yudhistiraBank.register(nadia, "platinum", 540000);
// ! Expected: Selamat datang ke Yudhistira Bank, Nadia. Nomor Akun anda adalah 6332937. Total saldo adalah 54000

let nadiaAccount = nadia.bankAccount;

/* PASTIKAN BAHWA SALDO SELALU BERKURANG ATAU BERTAMBAH UNTUK SETIAP TRANSAKSI */
nadiaAccount.credit(300000);
// ! Expected: Anda sukses menyimpan uang ke dalam bank.

nadiaAccount.credit(1000);
// ! Expected: Belum memenuhi minimal uang yang dapat di setor

nadiaAccount.debet(200000, "Beli Keyboard");
// ! Expected: Anda sukses menarik uang dari bank

nadiaAccount.debet(480000, "Beli Keyboard Lagi");
// ! Expected: Saldo minimum anda tidak terpenuhi untuk melakukan transaksi.

nadiaAccount.debet(600000, "Bisa gak ya lebih besar dari balance ? ");
// ! Expected: Saldo anda tidak cukup

let semmi = new Person("Semmi Verian");
yudhistiraBank.register(semmi, "silver", 10000000);
let semmiAccount = semmi.bankAccount;

nadiaAccount.transfer(semmiAccount, 100000);
// Anda sukses transfer ke Semmi Verian
nadiaAccount.transfer(semmiAccount, 1000000);
// Anda gagal transfer ke Semmi Verian

console.log(nadiaAccount);
// Expected:
// Platinum {
//   memberName: 'Nadia',
//   accountNumber: 5622164,
//   minimumBalance: 50000,
//   balance: 60000,
//   transactions: [
//     Transaction {
//       nominal: 300000,
//       status: 'credit',
//       date: 2024-08-03T13:21:13.818Z,
//       note: 'nyetor'
//     },
//     Transaction {
//       nominal: 200000,
//       status: 'debet',
//       date: 2024-08-03T13:21:13.819Z,
//       note: 'Beli Keyboard'
//     },
//     Transaction {
//       nominal: 480000,
//       status: 'debet',
//       date: 2024-08-03T13:21:13.819Z,
//       note: 'Beli Keyboard Lagi'
//     },
//     Transaction {
//       nominal: 100000,
//       status: 'debet',
//       date: 2024-08-03T13:21:13.820Z,
//       note: 'transfer ke akun Semmi Verian'
//     }
//   ],
//   type: 'platinum'
// }

// **Dilarang mengubah code testcase**
