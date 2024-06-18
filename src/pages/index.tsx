import { Link } from "react-router-dom"


const IndexPage = () => (
  <div>
    <h1>Home</h1>
    <p>Welcome to the JKU Exam simulator.</p>
    <Link to="/subject/python2">Go to Python 2 exams</Link>
  </div>
)

export default IndexPage