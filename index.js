const express = require('express');
const app = express();
const port = 3000;

// محاكاة لقاعدة بيانات تحتوي على كتب
let books = [
    { isbn: '1234567890', title: 'Book 1', author: 'Author 1', review: 'This book is fantastic! Highly recommended.' },
    { isbn: '0987654321', title: 'Book 2', author: 'Author 2', review: 'An interesting read, but a bit slow at times.' }
];

// محاكاة قاعدة بيانات غير متزامنة
const getBooksFromDatabase = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(books);  // العودة بالمصفوفة المحاكاة
        }, 1000);  // تأخير لمحاكاة جلب البيانات
    });
};

// دالة لحفظ كتاب في قاعدة البيانات
const saveBookToDatabase = async (book) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            books.push(book);  // إضافة الكتاب إلى قاعدة البيانات
            resolve(book);
        }, 500); // تأخير لمحاكاة وقت الحفظ
    });
};

// دالة لإيجاد الكتاب بواسطة الـ ISBN
const findBookByIsbn = async (isbn) => {
    return new Promise((resolve, reject) => {
        const book = books.find(b => b.isbn === isbn);
        if (book) {
            resolve(book);
        } else {
            reject('Book not found');
        }
    });
};

// نقطة النهاية لعرض جميع الكتب
app.get('/books', async (req, res) => {
    try {
        const booksList = await getBooksFromDatabase(); // جلب الكتب من قاعدة البيانات
        res.json(booksList); // إرسال الكتب في استجابة JSON
    } catch (error) {
        res.status(500).send('Failed to retrieve books'); // في حال حدوث خطأ
    }
});

// نقطة النهاية لإضافة مراجعة لكتاب
app.post('/book/:isbn/review', express.json(), async (req, res) => {
    const { isbn } = req.params;
    const { review } = req.body;

    try {
        const book = await findBookByIsbn(isbn);  // العثور على الكتاب باستخدام الـ ISBN
        book.review = review;  // إضافة أو تحديث المراجعة
        res.json(book);  // إرسال الكتاب بعد تحديث المراجعة
    } catch (error) {
        res.status(404).send(error);  // في حال عدم العثور على الكتاب
    }
});

// نقطة النهاية لحذف مراجعة كتاب
app.delete('/book/:isbn/review', async (req, res) => {
    const { isbn } = req.params;

    try {
        const book = await findBookByIsbn(isbn);  // العثور على الكتاب باستخدام الـ ISBN
        book.review = '';  // حذف المراجعة
        res.json({ message: 'Review deleted successfully' });  // إرسال رسالة النجاح
    } catch (error) {
        res.status(404).send(error);  // في حال عدم العثور على الكتاب
    }
});

// نقطة النهاية لإضافة كتاب جديد
app.post('/books', express.json(), async (req, res) => {
    const { isbn, title, author, review } = req.body;
    const newBook = { isbn, title, author, review: review || '' };
    // إضافة الكتاب إلى قاعدة البيانات أو القائمة هنا
    res.status(201).send('Book added successfully');
});


    try {
        const savedBook = await saveBookToDatabase(newBook);  // حفظ الكتاب الجديد في قاعدة البيانات
        res.json(savedBook);  // إرسال الكتاب المحفوظ
    } catch (error) {
        res.status(500).send('Failed to add book');
    }
});

// تشغيل الخادم
app.listen(3001, () => {
    console.log('Server running at http://localhost:3001');
});
