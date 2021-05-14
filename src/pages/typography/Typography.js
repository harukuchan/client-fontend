
import axios from "axios";
// import Pusher from "pusher";
import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { Row, Col, Alert } from "reactstrap";
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
import Select from 'react-select';
import Table from "reactstrap/lib/Table";
import { ChatEngine } from 'react-chat-engine';


// import { useRealTimeEventTrigger } from 'react-realtime'



import Widget from "../../components/Widget";
import Badge from "reactstrap/lib/Badge";
import { Redirect } from "react-router";

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
  const [selectmultiple, setSelectMultiple] = useState([])
  const [urldownload, setUrlDownload] = useState([])

  const [getfile, setGetFile] = useState([]);
  const [getfilenot, setGetFileNot] = useState([]);
  const [getgroup, setGetGroup] = useState([]);
  const isMountedVal = useRef(1);
  const isMountedValnot = useRef(1);

  useEffect(() => {
    axios.get("/api/getallgroup")
      .then(res => {
        const newarr = res.data.group.map(item =>{
          return {
            groupname : item.groupname,
            keygroup : item.keygroup,
          }
        })
        setGetGroup((getgroup) => [...getgroup, ...newarr])
      })
      .catch(err => console.log(err))
  }, [])
  useEffect(() => {
    if (isMountedValnot.current === 1) {
      axios.get("/api/getallfilenotres")
        .then(res => {
          setGetFileNot((getfilenot) => [...getfilenot, ...res.data.file])
        }
        )
        .catch(err => console.log(err))
      isMountedValnot.current = 0;
    }
    return () => {
      isMountedValnot.current = 0;
    }
  }, [isMountedValnot])

  useEffect(() => {
    if (isMountedVal.current === 1) {
      axios.get("/api/getallfile")
        .then(res => {
          setGetFile((getfile) => [...getfile, ...res.data.file])
        }
        )
        .catch(err => console.log(err))
      isMountedVal.current = 0;
    }

    return () => {
      isMountedVal.current = 0;
    }
  }, [isMountedVal]);



  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(file);
    console.log(selectmultiple);
    const data = new FormData();
    data.append('file', file, file.name);
    data.append('selectMulti', selectmultiple);
    console.log(data);

    axios.post('/api/uploadcongvan', data)
      .then(res =>{
        if(res.data.message === 'upload success !'){
          alert(res.data.message);
          return <Redirect to="/app/typography" />
        }
      }
      )
      .catch(err => console.log(err));
  }

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  }
  const handleChangeSelect = (event) => {
    event.preventDefault();

    if (selectmultiple.indexOf(event.target.value) === -1) {
      setSelectMultiple([...selectmultiple, event.target.value]);
    }
  }
  const handleChangeSelectClear = (e) => {
    e.preventDefault();
    setSelectMultiple([]);
  }

  const handleSubmit1 = (event) => {
    event.preventDefault();
    const datanot = new FormData();
    datanot.append('filenot', file1, file1.name);
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
          setUrlDownload((urldownload) => [...urldownload, {
            'idbutton': id,
            'url': res.data.url,
          }])
        }
      )
      .catch(
        error => console.log(error)
      )
    return () => {

    }
  }

  const handleview1 = (e) => {
    e.preventDefault();
    const id = e.target.getAttribute("idbutton");
    const data = {
      "viewfile": e.target.value,
    }
    axios.post("/api/getfilenotresfromaws", data)
      .then(
        res => {
          console.log(res.data.url)
          setUrlDownload((urldownload) => [...urldownload, {
            'idbutton': id,
            'url': res.data.url,
          }])
        }
      )
      .catch(
        error => console.log(error)
      )
    return () => {

    }
  }

  const handleApproved = (e) => {
    e.preventDefault();
    const id = e.target.getAttribute("idbuttonapproved");
    const data = {
      "filename": e.target.value,
      "author_approved": localStorage.getItem('user-current-role'),
    }
    axios.post("/api/changestatus", data)
      .then(
        res => {
          const new_data = getfile.filter(item => item._id !== res.data.file._id);
          setGetFile([...new_data, res.data.file]);
        }
      )
      .catch(
        error => console.log(error)
      )
    return () => {

    }
  }
  const handleApproved1 = (e) => {
    e.preventDefault();
    const id = e.target.getAttribute("idbuttonapproved");
    const data = {
      "filename": e.target.value,
      "author_approved": localStorage.getItem('user-current-role'),
    }
    axios.post("/api/changestatusnotres", data)
      .then(
        res => {
          const new_data = getfilenot.filter(item => item._id !== res.data.file._id);
          setGetFileNot([...new_data, res.data.file]);
        }
      )
      .catch(
        error => console.log(error)
      )
    return () => {

    }
  }
  if (getfile.length !== 0 || getfilenot.length !== 0) {
    return (
      <div>
        <h1 className="page-title">
          Công Văn - <span className="fw-semi-bold">Upload & Showing</span>
        </h1>
        <Row>
          <Col xs={6} lg={6}>
            {localStorage.getItem('user-current-role') !== "thuthu" ? null :
            <center>
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
                        <Input type="select" name="selectMulti" id="selectMulti" onChange={handleChangeSelect} multiple>
                          {getgroup.map((row) => (
                            <option value={row.groupname}>{row.groupname}</option>
                          ))}
                        </Input>
                        <Badge color="warning">Group Selected</Badge><br></br>
                        {selectmultiple.length === 0 ? <Widget></Widget> :
                          <Widget>
                            {selectmultiple.map((row) => (
                              <Alert color="primary" value={row} >{row}</Alert>
                            ))}
                          </Widget>
                        }
                        <Button type="clear" color="danger" onClick={handleChangeSelectClear} >Clear All Group</Button>
                        <Button type="submit" color="success">Up File</Button>
                      </form>
                    </Row>
                  </div>
                
              </Widget>
              </center>}
          </Col>

          <Col xs={6} lg={6}>
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
                <h5 className="mt-5">Công văn không cần phản hồi</h5>
                <p>Các loại định dạng công văn (PDF, Docx , txt ,... )</p>
                <div className="widget-padding-md w-100 h-100 text-left border rounded">
                  <Row>
                    <form onSubmit={handleSubmit1} enctype="multipart/form-data">
                      <input type="file" name="filenot" id="filenot" onChange={handleChange1} />
                      <Input type="select" name="selectMulti1" id="selectMulti1" multiple>
                        {getgroup.map((row) => (
                          <option value={row.keygroup}>{row.groupname}</option>
                        ))}
                      </Input>
                      <Button type="submit" color="success">Up File</Button>
                    </form>
                  </Row>
                </div>
              </Widget>}
          </Col>
          <Col xs={12} lg={12}>
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
                      <th className="hidden-sm-down">Approved By</th>
                      <th className="hidden-sm-down">Status</th>
                      <th className="hidden-sm-down">Option</th>
                    </tr>
                  </thead>
                  <tbody>

                    {getfile.map((row) => (
                      <tr>
                        <td>{row.namecongvan}</td>
                        <td>{row.mimetype}</td>
                        <td>{row.author_id}</td>
                        <td>{row.type}</td>
                        <td>{row.policy}</td>
                        <br></br>
                        <td>
                          <ButtonGroup>
                            {urldownload.length !== 0 ? urldownload.map(item => {
                              if (item.idbutton === row._id) {
                                return <Button outline color="danger" href={item.url}>Download</Button>
                              }
                            }) : null}
                            <Button outline color="primary" idbutton={row._id} value={row.namecongvan} onClick={handleview} >View</Button>
                            {(localStorage.getItem('user-current-role') !== 'giamdoc') ? null :
                              <ButtonGroup>
                                {(row.type !== 'approved') ? <Button outline color="secondary" idbuttonapproved={row._id} value={row.namecongvan} onClick={handleApproved}>Approve</Button>
                                  : <Button outline color="warning">Redo Approved</Button>
                                }
                              </ButtonGroup>
                            }
                            <Button outline color="success" onClick={toggle}>Edit</Button>
                            <Button outline color="danger" onClick={toggle}>Delete</Button>

                          </ButtonGroup>
                        </td>
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
                      <th className="hidden-sm-down">Approved By</th>
                      <th className="hidden-sm-down">Status</th>
                      <th className="hidden-sm-down">Option</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getfilenot.map((row) => (
                      <tr>
                        <td>{row.namecongvan}</td>
                        <td>{row.mimetype}</td>
                        <td>{row.author_id}</td>
                        <td>{row.type}</td>
                        <br></br>
                        <td>
                          <ButtonGroup>
                            {urldownload.length !== 0 ? urldownload.map(item => {
                              if (item.idbutton === row._id) {
                                return <Button outline color="danger" href={item.url}>Download</Button>
                              }
                            }) : null}
                            <Button outline color="primary" idbutton={row._id} value={row.namecongvan} onClick={handleview1} >View</Button>
                            {(localStorage.getItem('user-current-role') !== 'giamdoc') && (row.type === 'approved') ? null :
                              <ButtonGroup>
                                {(row.type !== 'approved') ?
                                  <Button outline color="secondary" idbuttonapproved={row._id} value={row.namecongvan} onClick={handleApproved1} >Approve</Button>
                                  : <Button outline color="warning">Redo Approved</Button>
                                }
                              </ButtonGroup>


                            }
                            <Button outline color="success" onClick={toggle}>Edit</Button>
                            <Button outline color="danger" onClick={toggle}>Delete</Button>

                          </ButtonGroup>
                        </td>
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
              <ChatEngine
                height='100vh'
                projectID='7aa64fdf-aee6-445a-816a-2a03f2b0cdfc'
                userName='minhnghia'
                userSecret='123456'
              />
            </Widget>
          </Col>
        </Row>
      </div >
    )
  }
  else {
    return (
      <div>
        <Spinner type="grow" color="primary" />
        <Spinner type="grow" color="secondary" />
        <Spinner type="grow" color="success" />
        <Spinner type="grow" color="danger" />
        <Spinner type="grow" color="warning" />
        <Spinner type="grow" color="info" />
        <Spinner type="grow" color="light" />
        <Spinner type="grow" color="dark" />
      </div>
    );
  }

}


export default Typography;
