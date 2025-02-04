const RB = ReactBootstrap;
const { Alert, Card, Button, Table } = ReactBootstrap;


class App extends React.Component {
    title = (
        <Alert variant="info">
            <b>Work6 :</b> Firebase
        </Alert>
    );
    footer = (
        <div>
            By 663380354-8 Pongpat Pitpibulpol <br />
            College of Computing, Khon Kaen University
        </div>
    );
    state = {
        scene: 0,
    }
    render() {
        return (
            <Card>
                <Card.Header>{this.title}</Card.Header>
                <LoginBox user={this.state.user} app={this}></LoginBox>
                <Card.Body></Card.Body>
                <Card.Footer>{this.footer}</Card.Footer>
            </Card>
        );
    }


    insertData() {
        db.collection("students").doc(this.state.stdid).set({
            title: this.state.stdtitle,
            fname: this.state.stdfname,
            lname: this.state.stdlname,
            phone: this.state.stdphone,
            email: this.state.stdemail,
        });
    }


    autoRead() {
        db.collection("students").onSnapshot((querySnapshot) => {
            var stdlist = [];
            querySnapshot.forEach((doc) => {
                stdlist.push({ id: doc.id, ...doc.data() });
            });
            this.setState({ students: stdlist });
        });
    }


    readData() {
        db.collection("students").get().then((querySnapshot) => {
            var stdlist = [];
            querySnapshot.forEach((doc) => {
                stdlist.push({ id: doc.id, ...doc.data() });
            });
            console.log(stdlist);
            this.setState({ students: stdlist });
        });
    }

    edit(std) {
        this.setState({
            stdid: std.id,
            stdtitle: std.title,
            stdfname: std.fname,
            stdlname: std.lname,
            stdemail: std.email,
            stdphone: std.phone,
        })
    }

    delete(std) {
        if (confirm("ต้องการลบข้อมูล")) {
            db.collection("students").doc(std.id).delete();
        }
    }


    state = {
        scene: 0,
        user: null,
    }
    constructor() {
        super();
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user: user.toJSON() });
            } else {
                this.setState({ user: null });
            }
        });
    }


    google_login() {
        // Using a popup.
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope("profile");
        provider.addScope("email");
        firebase.auth().signInWithPopup(provider);
    }


    google_logout() {
        if (confirm("Are you sure?")) {
            firebase.auth().signOut();
        }
    }

}

function LoginBox(props) {
    const u = props.user;
    const app = props.app;
    if (!u) {
        return <div><Button onClick={() => app.google_login()}>Login</Button></div>
    } else {
        return <div>
            <img src={u.photoURL} />
            {u.email}<Button onClick={() => app.google_logout()}>Logout</Button></div>
    }
}



function EditButton({ std, app }) {
    return <button onClick={() => app.edit(std)}>แก้ไข</button>
}

function DeleteButton({ std, app }) {
    return <button onClick={() => app.delete(std)}>ลบ</button>
}

function StudentTable({ data, app }) {
    return <table className='table'>
        <tr>
            <td>รหัส</td>
            <td>คำนำหน้า</td>
            <td>ชื่อ</td>
            <td>สกุล</td>
            <td>email</td>
        </tr>
        {
            data.map((s) => <tr>
                <td>{s.id}</td>
                <td>{s.title}</td>
                <td>{s.fname}</td>
                <td>{s.lname}</td>
                <td>{s.email}</td>
                <td><EditButton std={s} app={app} /></td>
                <td><DeleteButton std={s} app={app} /></td>
            </tr>)
        }
    </table>
}

function TextInput({ label, app, value, style }) {
    return <label className="form-label">
        {label}:
        <input className="form-control" style={style}
            value={app.state[value]} onChange={(ev) => {
                var s = {};
                s[value] = ev.target.value;
                app.setState(s)
            }
            }></input>
    </label>;
}


const container = document.getElementById("myapp");
const root = ReactDOM.createRoot(container);
root.render(<App />);


// ใช้ config จาก เว็บ Firebase: Project Setting 
const firebaseConfig = {
    apiKey: "AIzaSyBsxOlEYH0OjShsimwgGFlE5J8ix-Kvuyo",
    authDomain: "web2567-pongpat.firebaseapp.com",
    projectId: "web2567-pongpat",
    storageBucket: "web2567-pongpat.firebasestorage.app",
    messagingSenderId: "982703817617",
    appId: "1:982703817617:web:67ecd7f8419713b28c1030",
    measurementId: "G-8V3CCFTXDT"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
// db.collection("students").get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//         console.log(`${doc.id} =>`, doc.data());
//     });
// });

