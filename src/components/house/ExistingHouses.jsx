import React, {useEffect, useState} from 'react';
import {deleteHouse, getAllHouses} from "../utils/ApiFunctions.js";
import {Col, Row} from "react-bootstrap";
import HouseFilter from "../common/HouseFilter.jsx";
import {Link} from "react-router-dom";
import {FaEdit, FaEye, FaPlus, FaTrashAlt} from "react-icons/fa";
import HousePaginator from "../common/HousePaginator.jsx";

const ExistingHouses = () => {
    const [houses, setHouses] = useState([{
        id: "",
        houseType: "",
        housePrice: "",
        houseRoom: "",
        houseBathroom: "",
        houseSurface: "",
        houseCountry: "",
        houseAddress: "",
        houseYear: ""
    }])
    const [currentPage, setCurrentPage] = useState(1)
    const [housesPerPage] = useState(8)
    const [isLoading, setIsLoading] = useState(false)
    const [filteredHouses, setFilteredHouses] = useState([{
        id: "",
        houseType: "",
        housePrice: "",
        houseRoom: "",
        houseBathroom: "",
        houseSurface: "",
        houseCountry: "",
        houseAddress: "",
        houseYear: ""
    }])
    const [selectedHouseType, setSelectedHouseType] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    useEffect(() => {
        fetchHouses()
    }, [])

    const fetchHouses = async () => {
        setIsLoading(true)
        try {
            const result = await getAllHouses()
            setHouses(result)
            setIsLoading(false)
        } catch (error) {
            setErrorMessage("Error fetching houses")
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (selectedHouseType === "") {
            setFilteredHouses(houses)
        } else {
            const filtered = houses.filter((house) => house.houseType === selectedHouseType)
            setFilteredHouses(filtered)
        }
        setCurrentPage(1)
    }, [houses, selectedHouseType])

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const handleDelete = async (houseId) => {
        try {
            const result = await deleteHouse(houseId)
            if (result === "") {
                setSuccessMessage(`House No ${houseId} deleted successfully`)
                fetchHouses()
            } else {
                console.error(`Error deleting house : ${result.message}`)
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
        setTimeout(() => {
            setSuccessMessage("")
            setErrorMessage("")
        }, 3000)
    }

    const calculateTotalPages = (filteredHouses, housesPerPage, houses) => {
        const totalHouses = filteredHouses.length > 0 ? filteredHouses.length : houses.length
        return Math.ceil(totalHouses / housesPerPage)
    }

    const indexOfLastHouse = currentPage * housesPerPage
    const indexOfFirstHouse = indexOfLastHouse - housesPerPage
    const currentHouses = filteredHouses.slice(indexOfFirstHouse, indexOfLastHouse)

    return (

        <>
            <div className="container col-md-8 col-lg-6">
                {successMessage && <p className="alert alert-success mt-5">{successMessage}</p>}

                {errorMessage && <p className="alert alert-danger mt-5">{errorMessage}</p>}
            </div>

            {isLoading ? (
                <p>Loading existing Houses</p>
            ) : (
                <>
                    <section className="mt-5 mb-5 container">
                        <div className="d-flex justify-content-between mb-3 mt-5">
                            <h2>Existing Houses</h2>
                        </div>

                        <Row>
                            <Col md={6} className="mb-2 md-mb-0">
                                <HouseFilter data={houses} setFilteredData={setFilteredHouses}/>
                            </Col>

                            <Col md={6} className="d-flex justify-content-end">
                                <Link to={"/add-house"}>
                                    <FaPlus/> Add House
                                </Link>
                            </Col>
                        </Row>

                        <table className="table table-bordered table-hover">
                            <thead>
                            <tr className="text-center">
                                <th>ID</th>
                                <th>Type</th>
                                <th>Price</th>
                                <th>Room</th>
                                <th>Bathroom</th>
                                <th>Surface</th>
                                <th>Country</th>
                                <th>Address</th>
                                <th>Year</th>
                                <th>Actions</th>
                            </tr>
                            </thead>

                            <tbody>
                            {currentHouses.map((house) => (
                                <tr key={house.id} className="text-center">
                                    <td>{house.id}</td>
                                    <td> {house.houseType}</td>
                                    <td> {house.housePrice}</td>
                                    <td> {house.houseRoom}</td>
                                    <td> {house.houseBathroom}</td>
                                    <td> {house.houseSurface}</td>
                                    <td> {house.houseCountry}</td>
                                    <td> {house.houseAddress}</td>
                                    <td> {house.houseYear}</td>
                                    <td className="gap-2">
                                        <Link to={`/edit-house/${house.id}`} className="gap-2">
												<span className="btn btn-info btn-sm">
													<FaEye/>
												</span>
                                            <span className="btn btn-warning btn-sm ml-5">
													<FaEdit/>
												</span>
                                        </Link>
                                        <button
                                            className="btn btn-danger btn-sm ml-5"
                                            onClick={() => handleDelete(house.id)}>
                                            <FaTrashAlt/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <HousePaginator
                            currentPage={currentPage}
                            totalPages={calculateTotalPages(filteredHouses, housesPerPage, houses)}
                            onPageChange={handlePaginationClick}
                        />
                    </section>
                </>
            )}
        </>

    );
};

export default ExistingHouses;