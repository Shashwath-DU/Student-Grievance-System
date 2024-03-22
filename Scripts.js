async function loginUser(event) {
    event.preventDefault();
    const name = document.getElementsByName("login-name")[0].value;
    const password = document.getElementsByName("login-password")[0].value;

    const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            password: password
        }),
    });

    const data = await response.json();

    if (response.status === 200) {
        localStorage.setItem('user', name);
        alert(data.message);
        window.location.href = "./studentdashboard.html";
    } else {
        alert(data.message);
    }
    return false;
}


async function userProfile() {
    const usernameElement = document.getElementById("profile-username");
    const usnElement = document.getElementById("profile-usn");
    const emailElement = document.getElementById("profile-email");
    const phoneElement = document.getElementById("profile-phone");
    const dobElement = document.getElementById("profile-dob");
    const branchElement = document.getElementById("profile-branch");
    const semesterElement = document.getElementById("profile-sem");
    const user = localStorage.getItem('user');

    try {
        const response = await fetch('http://localhost:3000/api/userprofile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: user
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user profile');
        }

        const data = await response.json();
        const uData = data.user;

        usernameElement.textContent = uData.username;
        usnElement.textContent = uData.usn;
        emailElement.textContent = uData.email;
        phoneElement.textContent = uData.phone_number;
        dobElement.textContent = new Date(uData.date_of_birth).toLocaleDateString();
        branchElement.textContent = uData.branch;
        semesterElement.textContent = uData.semester;

    } catch (error) {
        console.error('Error fetching user profile:', error);
        // Handle error (e.g., show an error message to the user)
    }
}


async function uploadingcomplaint(event) {
    event.preventDefault();
    var user = localStorage.getItem('user');
    const CurrentUser = await fetch('http://localhost:3000/api/userprofile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: user
        }),
    });
    const userData = await CurrentUser.json();
    const usn = userData.user.usn;
    const branch = userData.user.branch;
    const subject = document.getElementsByName("complaint-sub")[0];
    const complaint = document.getElementsByName("complaint-com")[0];
    const date = new Date();

    const response = await fetch('http://localhost:3000/api/uploadcomplaint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            usn: usn,
            branch: branch,
            subject: subject.value,
            complaint: complaint.value,
            date: date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
        }),
    });

    const data = await response.json();

    if (response.status === 200) {
        alert(data.message);
        subject.value = '';
        complaint.value = '';
    } else {
        alert(data.message);
    }
    return false;
}

async function signupUser(event) {
    event.preventDefault();

    const username = document.getElementById("signup-name").value;
    const password = document.getElementById("signup-password").value;
    const usn = document.getElementById("signup-usn").value;
    const email = document.getElementById("signup-email").value;
    const phone_number = document.getElementById("signup-num").value;
    const date_of_birth = document.getElementById("signup-dob").value;
    const branch = document.getElementById("signup-branch").value;
    const semester = document.getElementById("signup-sem").value;

    try {
        const response = await fetch('http://localhost:3000/api/signupUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
                usn,
                email,
                phone_number,
                date_of_birth,
                branch,
                semester
            }),
        });

        const data = await response.json();

        if (response.status === 200) {
            alert(data.message);
            // Clear input fields after successful signup
            document.getElementById("signup-name").value = '';
            document.getElementById("signup-password").value = '';
            document.getElementById("signup-usn").value = '';
            document.getElementById("signup-email").value = '';
            document.getElementById("signup-num").value = '';
            document.getElementById("signup-dob").value = '';
            document.getElementById("signup-branch").value = '';
            document.getElementById("signup-sem").value = '';
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
}



async function tloginUser(event) {
    event.preventDefault();

    const name = document.getElementsByName("tlogin-name")[0].value;
    const password = document.getElementsByName("tlogin-password")[0].value;

    const response = await fetch('http://localhost:3000/api/tlogin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            password: password
        }),
    });

    const data = await response.json();

    if (response.status === 200) {
        localStorage.setItem('user', name); 
        alert(data.message);
        window.location.href = "./teacherdashboard.html"; 
    } else {
        alert(data.message);
    }
    return false;
}

async function auserProfile() {
    const username = document.getElementById("profile-ausername");
    const post = document.getElementById("profile-apost");
    const email = document.getElementById("profile-aemail");
    const phone_number = document.getElementById("profile-aphone");
    const date_of_birth = document.getElementById("profile-adob");
    var user = localStorage.getItem('user');

    const response = await fetch('http://localhost:3000/api/auserprofile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: user
      }),
    });

    const data = await response.json();
    const uData = data.user;
    if (response.status === 200) {
      username.innerHTML = uData.username;
      post.innerHTML = uData.post;
      email.innerHTML = uData.email;
      phone_number.innerHTML = uData.phone_number;
      var isoDateString = uData.date_of_birth.replace("T", " ").replace("Z", "");
      const [year, month, day, hour, minute, second] = isoDateString.split(/[- :]/);
      const jsDate = new Date(year, month - 1, day - 1, hour, minute, second);
      date_of_birth.innerHTML = jsDate.toLocaleDateString();

      const complaintsBody = document.getElementById('acomplaints-body');
      const response = await fetch('http://localhost:3000/api/agetcomplaints', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: user
        }),
      });

      const resp = await response.json();
      let html = '';
      resp.complaints?.forEach(element => {
        html += `<tr><td>${element.usn}</td><td>${element.subject}</td><td>${element.complaint}</td><td>${element.D_a_t_e}</td></tr>`;
      });
      complaintsBody.innerHTML = html;
    }
  }


  async function aloginUser(event) {
    event.preventDefault(); 

    const name = document.getElementsByName("alogin-name")[0].value;
    const password = document.getElementsByName("alogin-password")[0].value;

    const response = await fetch('http://localhost:3000/api/alogin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            password: password
        }),
    });

    const data = await response.json();

    if (response.status === 200) {
        localStorage.setItem('user', name); 
        alert(data.message);
        window.location.href = "./admindashboard.html"; 
    } else {
        alert(data.message);
    }
    return false;
}


async function tsignupUser(event) {
    event.preventDefault();

    const username = document.getElementById("tsignup-name").value;
    const password = document.getElementById("tsignup-password").value;
    const post = document.getElementById("tsignup-post").value;
    const email = document.getElementById("tsignup-email").value;
    const phone_number = document.getElementById("tsignup-num").value;
    const date_of_birth = document.getElementById("tsignup-dob").value;
    const branch = document.getElementById("tsignup-dep").value;

    try {
        const response = await fetch('http://localhost:3000/api/tsignupUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
                post,
                email,
                phone_number,
                date_of_birth,
                branch,
            }),
        });

        const data = await response.json();

        if (response.status === 200) {
            alert(data.message);
            document.getElementById("tsignup-name").value = '';
            document.getElementById("tsignup-password").value = '';
            document.getElementById("tsignup-post").value = '';
            document.getElementById("tsignup-email").value = '';
            document.getElementById("tsignup-num").value = '';
            document.getElementById("tsignup-dob").value = '';
            document.getElementById("tsignup-dep").value = '';
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
}


function openNav() {
    document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}
