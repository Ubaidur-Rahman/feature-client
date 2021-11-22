import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";

const FeatureRequest = () => {

    const [featureData, setFeatureData] = useState({
        title: '',
        description: '',
        status: '',
        // logo: null

    })
    const [logoURL, setLogoURL] = useState(null)
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const onSubmit = data => {
        reset('', {
            keepValues: false,
        })

        const newFeatureData = {
            ...featureData,
            title: data.title,
            description: data.description,
            status: data.status,
            logo: logoURL
        }
        const url = 'http://localhost:5055/feature/addFeature'
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newFeatureData)
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
    };
    const handleImageUpload = event => {
        console.log(event.target.files[0])
        const imageData = new FormData();
        imageData.set('key', '3a55021cd0e8e960fecdb61ee3bca9f2')
        imageData.append('image', event.target.files[0])

        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(function (response) {
                console.log(response.data.data.display_url)
                setLogoURL(response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });

    }



    return (
        <div className="">
            <div className="card shadow-lg bg-white">
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group">
                                    <label className="form-label">Title</label>
                                    <input {...register("title", { required: true })} placeholder="feature title" type="text" className="form-control field-box box-field" />
                                    {errors.title && <span className="text-danger">Title Is Required</span>}
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <label className="form-label">Description</label>
                                    <input {...register("description", { required: true })} placeholder="feature description" type="text" className="form-control field-box box-field" />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <label className="form-label">Status</label>
                                    <input {...register("status")} placeholder="status" type="text" className="form-control field-box box-field" />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <label className="form-label">Logo</label>
                                    <input {...register("logo", { required: true })} onChange={handleImageUpload} placeholder="logo" type="file" className="form-control field-box" />
                                </div>
                            </div>
                        </div>
                        <input className="add-btn mt-3" type="submit" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FeatureRequest;