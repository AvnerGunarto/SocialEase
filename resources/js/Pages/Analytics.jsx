import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import "react-calendar/dist/Calendar.css";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import axios from 'axios';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function Dashboard({ auth }) {
    const [likes, setLikes] = useState(0);
    const [reblogs, setReblogs] = useState(0);
    const [comments, setComments] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/tumblr/posts');
            const data = response.data;

            console.log('API response data:', data); // Debug log

            setLikes(data.total_likes);
            setReblogs(data.total_reblogs);
            setComments(data.total_comments);
            setTotalPosts(data.total_posts);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const commonOptions = {
        scales: {
            y: {
                beginAtZero: true,
                min: 0,
                max: 20,
                ticks: {
                    stepSize: 2,
                },
            },
        },
    };

    const likesData = {
        labels: ["Likes"],
        datasets: [
            {
                label: "Total Likes",
                data: [likes],
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
            },
        ],
    };

    const reblogsData = {
        labels: ["Reblogs"],
        datasets: [
            {
                label: "Total Reblogs",
                data: [reblogs],
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    const commentsData = {
        labels: ["Comments"],
        datasets: [
            {
                label: "Total Comments",
                data: [comments],
                backgroundColor: "rgba(153, 102, 255, 0.6)",
                borderColor: "rgba(153, 102, 255, 1)",
                borderWidth: 1,
            },
        ],
    };

    const totalPostsData = {
        labels: ["Total Posts"],
        datasets: [
            {
                label: "Total Posts",
                data: [totalPosts],
                backgroundColor: "rgba(255, 159, 64, 0.6)",
                borderColor: "rgba(255, 159, 64, 1)",
                borderWidth: 1,
            },
        ],
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        > 
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h1>Welcome to your Dashboard, {auth.user.name}</h1>
                            <p>Here you can find a summary of your activities on tumblr-yantvyu.</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                                <div className="bg-white p-4 rounded shadow" style={{ backgroundColor: "#f0f8ff" }}>
                                    <h3 className="text-lg mb-4">Total Likes</h3>
                                    <Bar data={likesData} options={commonOptions} />
                                </div>
                                <div className="bg-white p-4 rounded shadow" style={{ backgroundColor: "#e6f7ff" }}>
                                    <h3 className="text-lg mb-4">Total Reblogs</h3>
                                    <Bar data={reblogsData} options={commonOptions} />
                                </div>
                                <div className="bg-white p-4 rounded shadow" style={{ backgroundColor: "#f5f5f5" }}>
                                    <h3 className="text-lg mb-4">Total Comments</h3>
                                    <Bar data={commentsData} options={commonOptions} />
                                </div>
                                <div className="bg-white p-4 rounded shadow" style={{ backgroundColor: "#fff3e0" }}>
                                    <h3 className="text-lg mb-4">Total Posts</h3>
                                    <Bar data={totalPostsData} options={commonOptions} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
