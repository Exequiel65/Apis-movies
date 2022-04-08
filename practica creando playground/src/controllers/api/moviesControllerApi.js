const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");


//Aqui tienen una forma de llamar a cada uno de los modelos
// const {Movies,Genres,Actor} = require('../database/models');

//Aquí tienen otra forma de llamar a los modelos creados
const Movies = db.Movie;



const moviesController = {
    'list': (req, res) => {
        Movies.findAll()
        .then(movies =>{
            res.status(200).json({
                meta : {
                    status : 200,
                    total : movies.length,
                    url : "api/movies"
                },
                data : movies,
                
            })
        })
        .catch(errors => res.status(404).json({
            meta : {
                status : 404,
                url : "api/movies"
            },
            errors
        }))
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.status(200).json({
                    meta : {
                        status : 200,
                        total : movie.length,
                        url : `api/movies/detail/${movie.id}`
                    },
                    data : movie,
                    
                })
            })
            .catch(errors => res.status(404).json({
                meta : {
                    status : 404,
                    url : `api/movies/detail/${movie.id}`
                },
                errors
            }))
    },
    create: function (req,res) {
        let { title, rating, awards, release_date, length, genre_id } = req.body
        Movies.create({
            ...req.body
        })
        .then((movie) =>{
            res.status(200).json({
                meta : {
                    status : 200,
                    create : true,
                    url : `api/movies/add`
                },
                newMovie : movie
                
            })
        })
        .catch(errors => res.status(401).json({
            meta : {
                status : 401,
                create : false,
                url : `api/movies/add`
            },
            errors
        }))
    },
    destroy: function (req,res) {
        Movies.destroy({
            where : {
                id : req.params.id
            }
        })
        .then((movie) =>{
            res.status(200).json({
                meta : {
                    status : 200,
                    destroy : true,
                    url : `api/movies/destroy`
                },
                deleteMovie : movie
                
            })
        })
        .catch(errors => res.status(401).json({
            meta : {
                status : 401,
                create : false,
                url : `api/movies/destroy`
            },
            errors
        }))

    },
}

module.exports = moviesController;