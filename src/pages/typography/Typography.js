import axios from "axios";
import React, {useState} from "react";
import { Row, Col } from "reactstrap";
import Button from "reactstrap/lib/Button";

import Widget from "../../components/Widget";

const Typography = () => {

  const [file, setFile] = useState({})
  const [file1, setFile1] = useState({})

  const handleSubmit=(event) => {
    event.preventDefault();
    console.log(file);
    const data = new FormData();
    data.append('file', file, file.name);
    
    axios.post('/api/uploadcongvan', data)
      .then(res => 
        console.log(res)
        )
      .catch(err => console.log(err));
  }

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  }

  const handleSubmit1=(event) => {
    event.preventDefault();
    console.log(file1);
    const data = new FormData();
    data.append('file', file1, file1.name);
    
    axios.post('/api/uploadcongvannotres', data)
      .then(res => 
        console.log(res)
        )
      .catch(err => console.log(err));
  }

  const handleChange1 = (e) => {
    setFile1(e.target.files[0]);
  }


  return (
    <div>
    <h1 className="page-title">
      Công Văn - <span className="fw-semi-bold">Upload & Showing</span>
    </h1>
    <Row>
      <Col xs={12} lg={6}>
        <Widget
          title={
            <h4>
              Upload{" "}
              <small className="text-danger">Công Văn</small>
            </h4>
          }
          close
          collapse
        >
          <h5 className="mt-5">Công văn cần phản hồi</h5>
          <p>Các loại định dạng công văn (PDF, Docx , txt ,... )</p>
          <div className="widget-padding-md w-100 h-100 text-left border rounded">
            <Row>
              <form onSubmit={handleSubmit}>
                <input type="file" name="file" onChange={handleChange} />
                <input type="hidden" name="role" id="role" value={localStorage.getItem('user-current-name')}/>
                <Button type="submit" color="success">Up File</Button>
              </form>
            </Row>
          </div>
          <h5 className="mt-5">Công văn không cần phản hồi</h5>
          <p>Các loại định dạng công văn (PDF, Docx , txt ,... )</p>
          <div className="widget-padding-md w-100 h-100 text-left border rounded">
              <Row>
              <form onSubmit={handleSubmit1}>
                <input type="file" name="file" onChange={handleChange1} />
                <Button type="submit" color="success">Up File</Button>
              </form>
              </Row>
          </div>
          <br></br>
          <br></br>
          <h4>
              Display{" "}
              <small className="text-danger">Công Văn</small>
            </h4>
          <p>Headings to stand out</p>
          <div className="widget-padding-md w-100 h-100 text-left border rounded overflow-auto">
            {/* <h1 className="display-1">Display 1</h1>
            <h1 className="display-2">Display 2</h1>
            <h1 className="display-3">Display 3</h1>
            <h1 className="display-4">Display 4</h1> */}
          </div>
          <h4 className="mt-5">Lead</h4>
          <p>
            Make a paragraph stand out by adding{" "}
            <code className="highlighter-rouge">.lead</code>.
          </p>
          <div className="widget-padding-md w-100 h-100 text-left border rounded">
            <p className="lead">
              Light Blue Template is admin dashboard template built with
              Bootstrap
            </p>
          </div>
        </Widget>
      </Col>
      <Col xs={12} lg={6}>
        <Widget
          title={
            <h5>
              Body texts <small className="text-muted">Variations</small>
            </h5>
          }
          close
          collapse
        >
          <h4>Basic texts</h4>
          <p>Styling for common texts</p>
          <div className="widget-padding-md w-100 h-100 text-left border rounded">
            <p>
              You can use the mark tag to <mark>highlight</mark> text.
            </p>
            <p>
              <del>
                This line of text is meant to be treated as deleted text.
              </del>
            </p>
            <p>
              <ins>
                This line of text is meant to be treated as an addition to the
                document.
              </ins>
            </p>
            <p>
              <small>
                This line of text is meant to be treated as fine print.
              </small>
            </p>
            <p>
              <em>This line rendered as italicized text.</em>
            </p>
            <p>
              <strong>This line rendered as bold text.</strong>
            </p>
          </div>
          <h4 className="mt-5">Font weights</h4>
          <p>Various font weights supported</p>
          <div className="widget-padding-md w-100 h-100 text-left border rounded">
            <p>Thin (default) font weight</p>
            <p className="fw-normal">Normal font weight</p>
            <p className="fw-semi-bold">
              Semi bold to empasize important thing
            </p>
            <p className="fw-bold">Bold font as a high priority</p>
          </div>
          <h4 className="mt-5">Colors</h4>
          <p>Bootstrap state colors can be applied to texts too</p>
          <div className="widget-padding-md w-100 h-100 text-left border rounded">
            <p className="text-danger">Some danger text</p>
            <p className="text-warning">Some warning text</p>
            <p className="text-success">Some succes text</p>
            <p className="text-primary">Some primary text</p>
            <p className="text-info">Some info text</p>
          </div>
          <h4 className="mt-5">Blockquotes</h4>
          <p>Citing someone is really easy</p>
          <div className="widget-padding-md w-100 h-100 text-left border rounded">
            <blockquote className="blockquote">
              <p>
                Don&apos;t get set into one form, adapt it and build your own,
                and let it grow, be like water. Empty your mind, be formless,
                shapeless — like water. Now you put water in a cup, it becomes
                the cup; You put water into a bottle it becomes the bottle; You
                put it in a teapot it becomes the teapot. Now water can flow or
                it can crash. Be water, my friend.
              </p>
              <footer className="blockquote-footer">
                Bruce Lee in{" "}
                <cite title="A Warrior's Journey">
                  A Warrior&apos;s Journey
                </cite>
              </footer>
            </blockquote>
          </div>
        </Widget>
      </Col>
    </Row>
  </div>
  )
 
}

export default Typography;
