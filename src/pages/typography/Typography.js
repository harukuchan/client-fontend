import axios from "axios";
import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import Button from "reactstrap/lib/Button";
import ButtonGroup from "reactstrap/lib/ButtonGroup";
import FormGroup from "reactstrap/lib/FormGroup";
import Input from "reactstrap/lib/Input";
import InputGroup from "reactstrap/lib/InputGroup";
import InputGroupAddon from "reactstrap/lib/InputGroupAddon";
import InputGroupText from "reactstrap/lib/InputGroupText";
import Label from "reactstrap/lib/Label";
import Modal from "reactstrap/lib/Modal";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalFooter from "reactstrap/lib/ModalFooter";
import ModalHeader from "reactstrap/lib/ModalHeader";
import Spinner from "reactstrap/lib/Spinner";
import Table from "reactstrap/lib/Table";

import Widget from "../../components/Widget";

const Typography = () => {

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={toggle}>&times;</button>;

  const handleEdit = (event) => {
    event.preventDefault();
    alert('hj');
  }

  

  const [file, setFile] = useState({})
  const [file1, setFile1] = useState({})
  const [urldownload, setUrlDownload] = useState([])

  const [getfile, setGetFile] = useState([]);
  const [getfilenot, setGetFileNot] = useState([]);


  useEffect(() => {
    axios.get("/api/getallfile")
      .then(res => {
        setGetFile((getfile) => [...getfile, ...res.data.file])
      }
      )
      .catch(err => console.log(err))

      axios.get("/api/getallfilenotres")
      .then(res => {
        setGetFileNot((getfilenot) => [...getfilenot, ...res.data.file])
      }
      )
      .catch(err => console.log(err))
    return () => {

    }
  }, [])

  const handleSubmit = (event) => {
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

  const handleSubmit1 = (event) => {
    event.preventDefault();
    // console.log(file1);
    const datanot = new FormData();
    datanot.append('filenot', file1, file1.name);
    // datanot.append('role' , file1);
    console.log(file1);

    axios.post('/api/uploadcongvannotres', datanot)
      .then(res =>
        console.log(res)
      )
      .catch(err => console.log(err));
  }

  const handleChange1 = (e) => {
    setFile1(e.target.files[0]);
  }


  const handleview = (e) => {
    e.preventDefault();
    const id = e.target.getAttribute("idbutton");
    const data = {
      "viewfile": e.target.value,
    }
    axios.post("/api/getfilefromaws", data)
      .then( 
        res => {
          console.log(res.data.url)
          setUrlDownload((urldownload) => [...urldownload,{
            'idbutton' : id,
            'url' : res.data.url,
          }])
        }
      )
      .catch(
        error => console.log(error)
      )
    return () => {

    }
  }
  
  useEffect(() => {
    
  }, [])
    

  //if (getfile.length !== 0 || getfilenot.length !== 0 ) {
  return (

    <div>
      <h1 className="page-title">
        Công Văn - <span className="fw-semi-bold">Upload & Showing</span>
      </h1>
      <Row>
        <Col xs={12} lg={6}>
          {localStorage.getItem('user-current-role') !== "thuthu" ? null :
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
                  <form onSubmit={handleSubmit} enctype="multipart/form-data">
                    <input type="file" name="file" onChange={handleChange} />
                    <input type="hidden" name="role" id="role" value={localStorage.getItem('user-current-role')} />
                    <Button type="submit" color="success">Up File</Button>
                  </form>
                </Row>
              </div>
              <h5 className="mt-5">Công văn không cần phản hồi</h5>
              <p>Các loại định dạng công văn (PDF, Docx , txt ,... )</p>
              <div className="widget-padding-md w-100 h-100 text-left border rounded">
                <Row>
                  <form onSubmit={handleSubmit1} enctype="multipart/form-data">
                    <input type="file" name="filenot" id="filenot" onChange={handleChange1} />
                    <input type="hidden" name="role" id="role" value={localStorage.getItem('user-current-role')} />
                    <Button type="submit" color="success">Up File</Button>
                  </form>
                </Row>
              </div>
            </Widget>}

          <Widget
            close
            collapse
          >
            <Modal isOpen={modal} toggle={toggle} external={externalCloseBtn}>
              <ModalHeader>Modal title</ModalHeader>
              <ModalBody>
                <form>
                  <FormGroup className="mt">
                    <Label for="email">Email</Label>
                    <InputGroup className="input-group-no-border">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="la la-user text-white" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input id="email" className="input-transparent pl-3"
                        type="email"
                        required name="email" placeholder="Your Email" />
                    </InputGroup>
                  </FormGroup>

                  <FormGroup>
                    <Label for="confirmPassword">Gender</Label>
                    <InputGroup className="input-group-no-border">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-child" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="select" id="gender" className="input-transparent pl-3"
                        required>
                        <option>Choose...</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </Input>
                    </InputGroup>
                  </FormGroup>

                  <FormGroup>
                    <Label for="name">Name</Label>
                    <InputGroup className="input-group-no-border">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="la la-lock text-white" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input id="name" className="input-transparent pl-3"
                        type="text"
                        required name="Name" placeholder="Your Name" />
                    </InputGroup>
                  </FormGroup>

                  <FormGroup>
                    <Label for="role">Role</Label>
                    <Input type="select" id="role" className="input-transparent pl-3"
                      required>
                      <option>Choose...</option>
                      <option value="nhanvien">Nhân Viên</option>
                      <option value="truongphong">Trưởng Phòng</option>
                      <option value="thuky">Thư Ký</option>

                    </Input>
                  </FormGroup>
                  {/* <Button type="submit">Submit</Button> */}
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={handleEdit}>Do Something</Button>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
              </ModalFooter>
            </Modal>

            <Modal>

            </Modal>
            <h4>
              Display{" "}
              <small className="text-danger">Công Văn</small>
            </h4>
            <p>Headings to stand out</p>
            <div className="widget-padding-md w-100 h-100 text-left border rounded overflow-auto">
              <Table striped>
                <thead>
                  <tr className="fs-sm">
                    <th className="hidden-sm-down">Name</th>
                    <th className="hidden-sm-down">MiMetype</th>
                    <th className="hidden-sm-down">Author</th>
                    <th className="hidden-sm-down">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {getfile.map((row) => (
                    <tr>
                      <td>{row.namecongvan}</td>
                      <td>{row.mimetype}</td>
                      <td>{row.author_id}</td>
                      <td>{row.status}</td>
                      <br></br>
                      <ButtonGroup>
                        {urldownload.length !== 0 ? urldownload.map(item => {
                          if(item.idbutton === row._id)
                          {
                            return <a href={item.url}>Download</a>
                          }
                        }) : null}
                        <Button color="danger" idbutton={row._id} value={row.namecongvan} onClick={handleview} >View</Button>
                        <Button color="danger" onClick={toggle}>Edit</Button>
                        <Button color="danger" onClick={toggle}>Delete</Button>

                      </ButtonGroup>

                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

          </Widget>

          <Widget
            close
            collapse
          >
            <h4>
              Display{" "}
              <small className="text-danger">Công Văn NOT</small>
            </h4>
            <p>Headings to stand out</p>
            <div className="widget-padding-md w-100 h-100 text-left border rounded overflow-auto">
              <Table striped>
                <thead>
                  <tr className="fs-sm">
                    <th className="hidden-sm-down">Name</th>
                    <th className="hidden-sm-down">MiMetype</th>
                    <th className="hidden-sm-down">Author</th>
                    <th className="hidden-sm-down">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {getfilenot.map((row) => (
                    <tr>
                      <td>{row.namecongvan}</td>
                      <td>{row.mimetype}</td>
                      <td>{row.author_id}</td>
                      <td>{row.status}</td>
                      <br></br>
                      <ButtonGroup>

                        <Button color="danger" value={row.namecongvan} onClick={handleview} >View</Button>
                        <Button color="danger" onClick={toggle}>Edit</Button>
                        <Button color="danger" onClick={toggle}>Delete</Button>

                      </ButtonGroup>

                    </tr>
                  ))}
                </tbody>
              </Table>
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
  // }
  // else{
  //   return (
  //     <div>
  //         <Spinner type="grow" color="primary" />
  //         <Spinner type="grow" color="secondary" />
  //         <Spinner type="grow" color="success" />
  //         <Spinner type="grow" color="danger" />
  //         <Spinner type="grow" color="warning" />
  //         <Spinner type="grow" color="info" />
  //         <Spinner type="grow" color="light" />
  //         <Spinner type="grow" color="dark" />
  //     </div>
  // );
  // }

}


export default Typography;
