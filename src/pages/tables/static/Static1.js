import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {
  Row,
  Col,
  Table,
  Button,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Badge
} from "reactstrap";
// import { Sparklines, SparklinesBars } from "react-sparklines";
import Widget from "../../../components/Widget/Widget";
import s from "./Static.module.scss";
import ButtonGroup from 'reactstrap/lib/ButtonGroup';
import ModalHeader from 'reactstrap/lib/ModalHeader';
import Modal from 'reactstrap/lib/Modal';
import ModalBody from 'reactstrap/lib/ModalBody';
import ModalFooter from 'reactstrap/lib/ModalFooter';
import Spinner from 'reactstrap/lib/Spinner';
import Input from 'reactstrap/lib/Input';
import FormGroup from 'reactstrap/lib/FormGroup';
import Label from 'reactstrap/lib/Label';
import InputGroupText from 'reactstrap/lib/InputGroupText';
import InputGroup from 'reactstrap/lib/InputGroup';
import InputGroupAddon from 'reactstrap/lib/InputGroupAddon';

function Static() {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={toggle}>&times;</button>;
    // const ModalExample = (props) => {
    //     const {
    //       buttonLabel,
    //       className
    //     } = props;
    // }
    
    const handleEdit = (event) =>{
        event.preventDefault();
        

        
        // axios.post("http://127.0.0.1:8000/api/editusernhanvien")
        //     .then(res =>{
        //         console.log(res.data.user);
        //     })
        //     .catch(error => console.log(error))
        alert('hj chó quang');
    }

    const handleDelete = (event) =>{
        event.preventDefault();
        axios.post("http://127.0.0.1:8000/api/deleteusernhanvien")
            .then(res =>{
                console.log(res);
            })
            .catch(error => console.log(error))
    }

    const [nhanvien, setNhanVien] = useState([])
    
    useEffect(()=> {
        axios.get("http://127.0.0.1:8000/api/getusernhanvien")
            .then(res => {
                console.log(res.data.user);
                setNhanVien((nhanvien) => [...nhanvien, ...res.data.user])
                
            }
                )
            .catch(err => console.log(err))
            
            return () => {
                
            }
    }, [])

    if(nhanvien.length !== 0)
    {
        return (
                <div className={s.root}>
                    <h2 className="page-title">
                    Tables - <span className="fw-semi-bold">Static</span>
                    </h2>
                    <Row>
                    <Col>
                        <Widget
                        title={
                            <h5>
                            User <span className="fw-semi-bold">Account</span>
                            </h5>
                        }
                        settings
                        close
                        bodyClass={s.mainTableWidget}
                        >
                        <Table striped>
                            <thead>
                            <tr className="fs-sm">
                                <th className="hidden-sm-down">ID</th>
                                <th className="hidden-sm-down">Email</th>
                                <th className="hidden-sm-down">Name</th>
                                <th className="hidden-sm-down">Info</th>
                                <th className="hidden-sm-down">Role</th>
                                <th className="hidden-sm-down">Date</th>
                                <th className="hidden-sm-down">Control</th>
                            </tr>
                            </thead>
                            <tbody>
                            {nhanvien.map((row) => (
                                <tr key={row.id}>
                                <td>{row._id}</td>
                                <td>{row.email}</td>
                                <td>{row.name}</td>
                                <td>
                                    <p className="mb-0">
                                    <small>
                                        Name:
                                        <span className="text-muted fw-semi-bold">
                                        &nbsp; {row.name}
                                        </span>
                                    </small>
                                    </p>
                                    <p>
                                    <small>
                                        Gender:
                                        <span className="text-muted fw-semi-bold">
                                        &nbsp; {row.gender}
                                        </span>
                                    </small>
                                    </p>
                                </td>
                                {/* <td className="text-muted">{this.parseDate(row.date)}</td> */}
                                <td className="text-muted">{row.phanquyen}</td>
                                <td>
                                    <p className="mb-0">
                                    <small>
                                        Create:
                                        <span className="text-muted fw-semi-bold">
                                        &nbsp; {row.created_at}
                                        </span>
                                    </small>
                                    </p>
                                    <p>
                                    <small>
                                        Update:
                                        <span className="text-muted fw-semi-bold">
                                        &nbsp; {row.updated_at}
                                        </span>
                                    </small>
                                    </p>
                                </td>
                                <td>
                                <ButtonGroup>
                                
                                <Button color="danger" onClick={toggle}>Edit</Button>
                                <Modal isOpen={modal} toggle={toggle} external={externalCloseBtn}>
                                    <ModalHeader>Modal title</ModalHeader>
                                    <ModalBody>
                                        <form>
                                        <FormGroup className="mt">
                                            <Label for="email">Email</Label>
                                            <InputGroup className="input-group-no-border">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="la la-user text-white"/>
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
                                                        <i className="fa fa-child"/>
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
                                                        <i className="la la-lock text-white"/>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input id="name" className="input-transparent pl-3" 
                                                    type="text"
                                                    required name="Name" placeholder="Your Name"/>
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

                                    <Button color="primary" onClick={handleDelete}>Delete</Button>
                                </ButtonGroup>
                                
                                </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                        <div className="clearfix">
                            <div className="float-right">
                            <Button color="default" className="mr-2" size="sm">
                                Send to...
                            </Button>
                            <UncontrolledButtonDropdown>
                                <DropdownToggle
                                color="inverse"
                                className="mr-xs"
                                size="sm"
                                caret
                                >
                                Clear
                                </DropdownToggle>
                                <DropdownMenu>
                                <DropdownItem>Clear</DropdownItem>
                                <DropdownItem>Move ...</DropdownItem>
                                <DropdownItem>Something else here</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>Separated link</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledButtonDropdown>
                            </div>
                            <p>Basic table with styled content</p>
                        </div>
                        </Widget>
                    </Col>
                    </Row>
                    <Row>
                    <Col lg={6}>
                        <Widget
                        title={
                            <h5>
                            Table <span className="fw-semi-bold">Styles</span>
                            </h5>
                        }
                        settings
                        close
                        >
                        <h3>
                            Stripped <span className="fw-semi-bold">Table</span>
                        </h3>

                        <p>
                            Each row is highlighted. You will never lost there. Just{" "}
                            <code>.table-striped</code> it.
                        </p>
                        <br />
                        <br />
                        <h3>
                            Hover <span className="fw-semi-bold">Table</span>
                        </h3>
                        <p>
                            {"Trace only what's really important. "}
                            <code>.table-hover</code> is made for it.
                        </p>
                        <div className="table-responsive">
                            <Table className="table-hover">
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Status</th>
                                </tr>
                            </thead>
                            {/* eslint-disable */}
                            <tbody>
                                <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>
                                    <a href="#">ottoto@example.com</a>
                                </td>
                                <td>
                                    <Badge color="gray" className="text-secondary" pill>
                                    Pending
                                    </Badge>
                                </td>
                                </tr>
                                <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>
                                    <a href="#">fat.thor@example.com</a>
                                </td>
                                <td>
                                    <Badge color="gray" className="text-secondary" pill>
                                    Unconfirmed
                                    </Badge>
                                </td>
                                </tr>
                                <tr>
                                <td>3</td>
                                <td>Larry</td>
                                <td>the Bird</td>
                                <td>
                                    <a href="#">larry@example.com</a>
                                </td>
                                <td>
                                    <Badge color="primary" className="text-secondary" pill>
                                    New
                                    </Badge>
                                </td>
                                </tr>
                                <tr>
                                <td>4</td>
                                <td>Peter</td>
                                <td>Horadnia</td>
                                <td>
                                    <a href="#">peter@example.com</a>
                                </td>
                                <td>
                                    <Badge color="success" className="text-secondary" pill>
                                    Active
                                    </Badge>
                                </td>
                                </tr>
                            </tbody>
                            {/* eslint-enable */}
                            </Table>
                        </div>
                        </Widget>
                    </Col>
                    <Col lg={6}>
                        <Widget
                        title={
                            <h5>
                            Table <span className="fw-semi-bold">Styles</span>
                            </h5>
                        }
                        settings
                        close
                        >
                        <h3>
                            Bordered <span className="fw-semi-bold">Table</span>
                        </h3>
                        <p>
                            Each row is highlighted. You will never lost there. That&apos;s
                            how all of us learned in school the table should look like. Just
                            add
                            <code>.table-bordered</code> to it.
                        </p>
                        </Widget>
                        <Widget
                        title={
                            <h5>
                            Table <span className="fw-semi-bold">Styles</span>
                            </h5>
                        }
                        settings
                        close
                        >
                        <h3>
                            Overflow <span className="fw-semi-bold">Table</span>
                        </h3>
                        <p>
                            Add any non-bordered .table within a widget for a seamless
                            design. Awesome look for no cost. Just wrap the table with
                            simple css class <code>.widget-table-overflow</code> inside of
                            widget
                        </p>
                        </Widget>
                    </Col>
                    </Row>
                </div>
        )
    }
    else
    {
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

export default Static
