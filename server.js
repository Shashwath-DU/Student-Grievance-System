const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const con = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Puttu18*',
  database: 'grievance',
});

con.connect(err => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to the database');
});

app.post('/api/login', async (req, res) => {
  const username = req.body.name;
  const password = req.body.password;

  try {
    const q = `SELECT * FROM student WHERE username = ? AND password = ?`;
    con.query(q, [username, password], (err, result, fields) => {
      if (err) {
        res.status(500).json({ message: "server error" });
      }
      if (result.length !== 0) {
        res.status(200).json({ message: "login successful" });
      } else {
        res.status(401).json({ message: "login failed" });
      }
    });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ message: "server error" });
  }
});

app.post('/api/userprofile', async (req, res) => {
  const username = req.body.user;

  try {
    const q = `SELECT username, usn, email, phone_number, date_of_birth, branch, semester FROM student WHERE username = ?`;
    con.query(q, [username], (err, result, fields) => {
      if (err) {
        console.error('Database error:', err);
        res.status(500).json({ message: "server error" });
      } else {
        if (result.length !== 0) {
          res.status(200).json({ message: "User data found", user: result[0] });
        } else {
          res.status(401).json({ message: "User data not found" });
        }
      }
    });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ message: "server error" });
  }
});


app.post('/api/uploadcomplaint', async (req, res) => {
  const usn = req.body.usn;
  const branch = req.body.branch;
  const subject = req.body.subject;
  const complaint = req.body.complaint;
  const D_a_t_e = req.body.date;

  try {
    const q = 'INSERT INTO studgrievances (usn, branch, subject, complaint, D_a_t_e) VALUES (?,?,?,?,?)';
    con.query(q, [usn, branch, subject, complaint, D_a_t_e], (err, result, fields) => {
      if (err) {
        res.status(500).json({ message: "server error" });
      }
      if (result.length !== 0) {
        res.status(200).json({ message: "Upload successful" });
      } else {
        res.status(401).json({ message: "Upload failed" });
      }
    });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ message: "server error" });
  }
});

app.post('/api/getcomplaints', async (req, res) => {
  const usn = req.body.usn;

  try {
    const q = `SELECT * FROM studgrievances WHERE usn = ?`;
    con.query(q, [usn], (err, result, fields) => {
      if (err) {
        res.status(500).json({ message: "server error" });
      } else {
        if (result.length !== 0) {
          res.status(200).json({ message: "complaints data found", complaints: result });
        } else {
          res.status(401).json({ message: "complaints data not found" });
        }
      }
    });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ message: "server error" });
  }
});

app.post('/api/signupUser', async (req, res) => {
  const { username, password, usn, email, phone_number, date_of_birth, branch, semester } = req.body;

  try {
    const q = 'INSERT INTO student (username, password, usn, email, phone_number, date_of_birth, branch, semester) VALUES (?,?,?,?,?,?,?,?)';
    con.query(q, [username, password, usn, email, phone_number, date_of_birth, branch, semester], (err, result, fields) => {
      if (err) {
        res.status(500).json({ message: "Server error" });
      } else {
        res.status(200).json({ message: "Upload successful" });
      }
    });
  } catch (error) {
    console.error('Error during signup:', error.message);
    res.status(500).json({ message: "Server error" });
  }
});


app.post('/api/tlogin', async (req, res) => {
  const { name, password } = req.body; 

  try {
    const q = `SELECT * FROM teacher WHERE username = ? AND password = ?`;
    con.query(q, [name, password], (err, result, fields) => {
      if (err) {
        console.error('Error during login:', err.message);
        return res.status(500).json({ message: "server error" });
      }
      if (result.length !== 0) {
        res.status(200).json({ message: "login successful" });
      } else {
        res.status(401).json({ message: "login failed" });
      }
    });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ message: "server error" });
  }
});



app.post('/api/tuserprofile', async (req, res) => {
  const username = req.body.user;

  try {
    const q = `SELECT * FROM teacher WHERE username = ?`;
    con.query(q, [username], (err, result, fields) => {
      if (err) {
        res.status(500).json({ message: "server error" });
      } else {
        if (result.length !== 0) {
          res.status(200).json({ message: "User data found", user: result[0] });
        } else {
          res.status(401).json({ message: "User data not found" });
        }
      }
    });
  } catch (error) {
    console.error('Error during display:', error.message);
    res.status(500).json({ message: "server error" });
  }
});


app.post('/api/tgetcomplaints', async (req, res) => {
  const teacherBranch = req.body.teacherBranch;

  try {
    const q = `SELECT * FROM studgrievances WHERE branch = ?`;
    con.query(q, [teacherBranch], (err, result, fields) => {
      if (err) {
        res.status(500).json({ message: "server error" });
      } else {
        if (result.length !== 0) {
          res.status(200).json({ message: "complaints data found", complaints: result });
        } else {
          res.status(401).json({ message: "complaints data not found" });
        }
      }
    });
  } catch (error) {
    console.error('Error during fetching complaints:', error.message);
    res.status(500).json({ message: "server error" });
  }
});



app.post('/api/alogin', async (req, res) => {
  const { name, password } = req.body;

  try {
    const q = `SELECT * FROM adminis WHERE username = ? AND password = ?`;
    con.query(q, [name, password], (err, result, fields) => {
      if (err) {
        console.error('Error during login:', err.message);
        return res.status(500).json({ message: "server error" });
      }
      if (result.length !== 0) {
        res.status(200).json({ message: "login successful" });
      } else {
        res.status(401).json({ message: "login failed" });
      }
    });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ message: "server error" });
  }
});


app.post('/api/auserprofile', async (req, res) => {
  const username = req.body.user;

  try {
    const q = `SELECT * FROM adminis WHERE username = ?`;
    con.query(q, [username], (err, result, fields) => {
      if (err) {
        res.status(500).json({ message: "server error" });
      } else {
        if (result.length !== 0) {
          res.status(200).json({ message: "User data found", user: result[0] });
        } else {
          res.status(401).json({ message: "User data not found" });
        }
      }
    });
  } catch (error) {
    console.error('Error during display:', error.message);
    res.status(500).json({ message: "server error" });
  }
});

app.post('/api/agetcomplaints', async (req, res) => {
    try {
    const q = `SELECT * FROM studgrievances`;
    con.query(q, (err, result, fields) => {
      if (err) {
        res.status(500).json({ message: "server error" });
      } else {
        if (result.length !== 0) {
          res.status(200).json({ message: "complaints data found", complaints: result });
        } else {
          res.status(401).json({ message: "complaints data not found" });
        }
      }
    });
  } catch (error) {
    console.error('Error during fetching complaints:', error.message);
    res.status(500).json({ message: "server error" });
  }
});

app.post('/api/tsignupUser', async (req, res) => {
  const { username, password, post, email, phone_number, date_of_birth, branch} = req.body;

  try {
    const q = 'INSERT INTO teacher (username, password, post, email, phone_number, date_of_birth, branch) VALUES (?,?,?,?,?,?,?)';
    con.query(q, [username, password, post, email, phone_number, date_of_birth, branch], (err, result, fields) => {
      if (err) {
        res.status(500).json({ message: "Server error" });
      } else {
        res.status(200).json({ message: "Upload successful" });
      }
    });
  } catch (error) {
    console.error('Error during signup:', error.message);
    res.status(500).json({ message: "Server error" });
  }
});




const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
