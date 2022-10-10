import React from 'react';
import {
    Card,
    CardHeader,
    Avatar,
    CardContent,
    IconButton,
    Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'
import "./Experiences.scss";
import ReactTooltip from "react-tooltip";
import { useState } from 'react';
import { useEffect } from 'react';
import { requestData } from '../../container/dataService';

const PATH = 'portfolio/en/experiences/';

export const About = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        requestData('portfolio/en/experiences')
            .then(data => setData(data))
            .catch(err => console.log(err))
    }, [])
    const navigate = useNavigate();
    const handleEdit = (id) => {
        // pass id and path to <Edit /> component as in APP.jsx
        navigate(`../edit/experiences/${id}`)
    }
    const handleDelete = (id) => {
        deleteDataToken(PATH, token, id)
            .then(data => console.log(data))
            .then(() => navigate("/"))
    }
    return (
        <div className='wrapper'>
            {""}
            {data.map((experience, index) => (
                <Box key={index} marginTop={10} marginRight={3}>
                    <Card sx={{
                        width: "100%",
                        marginLeft: '220px',
                        marginRight: "auto",
                        mt: 2,
                        padding: 2,
                        boxShadow: "5px 5px 10px #ccc",
                        ":hover": {
                            boxShadow: "10px 10px 20px #ccc"
                        }
                    }}>
                        <Box display="flex">
                            <IconButton
                                sx={{ marginLeft: "auto" }}
                                onClick={() => handleEdit(experience._id)}
                            >
                                <EditIcon color="warning" />
                            </IconButton>
                            <IconButton
                                onClick={() => handleDelete(experience._id)}
                            ><DeleteForeverIcon color="error" />
                            </IconButton>
                        </Box>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
                                    {experience.userName ? experience.userName.charAt(0) : ""}
                                </Avatar>
                            }
                            title={experience.title}
                            subheader={new Date(experience.updatedAt).toLocaleString('pt-BR')}
                        />
                        <CardContent>
                            <motion.div className="app__skills-exp-item" key={experience._id}>
                                <div className="app__skills-exp-year">
                                    <p className="bold-text">{experience.year}</p>
                                </div>
                                <motion.div className="app__skills-exp-works">
                                    <>
                                        <motion.div
                                            whileInView={{ opacity: [0, 1] }}
                                            transition={{ duration: 0.5 }}
                                            className="app__skills-exp-work"
                                            data-tip
                                            data-for={experience.name}
                                            key={experience.name}
                                        >
                                            <h4 className="bold-text">{experience.name}</h4>
                                            <p className="p-text">{experience.company}</p>
                                        </motion.div>
                                        <ReactTooltip
                                            id={experience.name}
                                            effect="solid"
                                            arrowColor="#fff"
                                            className="skills-tooltip"
                                            scrollHide={true}
                                        >
                                            {experience.desc}
                                        </ReactTooltip>
                                    </>
                                </motion.div>
                            </motion.div>
                        </CardContent>
                    </Card>
                </Box>
            ))
            }
        </div>
    );
}

export default About