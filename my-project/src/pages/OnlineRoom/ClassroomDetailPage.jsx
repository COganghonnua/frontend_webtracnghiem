import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
    getPostsByRoom,
    createPost,
    addCommentToPost,
} from "../../services/postService";
import { checkIfOwner } from "../../services/classService"; // Import API kiểm tra quyền owner

const ClassroomDetailPage = () => {
    const { state } = useLocation(); // Lấy roomName từ state
    const roomName = state?.roomName || "Tên lớp không xác định"; // Nếu không có roomName, hiển thị giá trị mặc định
    const { id } = useParams();
    const navigate = useNavigate(); // Khởi tạo useNavigate
    const [posts, setPosts] = useState([]);
    const [newPostContent, setNewPostContent] = useState("");
    const [attachments, setAttachments] = useState([]);
    const [isOwner, setIsOwner] = useState(false); // Thêm state để lưu trạng thái quyền owner

    // Kiểm tra quyền owner
    useEffect(() => {
        const fetchOwnerStatus = async () => {
            try {
                const result = await checkIfOwner(id); // Gọi API kiểm tra quyền owner
                setIsOwner(result); // Cập nhật trạng thái
            } catch (error) {
                console.error("Lỗi khi kiểm tra quyền owner:", error);
            }
        };

        fetchOwnerStatus();
    }, [id]);

    // Lấy danh sách bài viết
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsData = await getPostsByRoom(id);
                setPosts(postsData);
            } catch (error) {
                console.error("Lỗi khi lấy bài viết:", error);
            }
        };
        fetchPosts();
    }, [id]);

    // Tạo bài viết mới
    const handleCreatePost = async () => {
        try {
            const formData = new FormData();
            formData.append("Content", newPostContent);
            formData.append("OnlineRoomId", id);
            formData.append("RoomName", roomName); // Truyền tên lớp
            attachments.forEach((file) => formData.append("Attachments", file));

            const newPost = await createPost(formData); // Gửi bài viết lên server
            setPosts([newPost, ...posts]);
            setNewPostContent("");
            setAttachments([]);
        } catch (error) {
            console.error("Lỗi khi tạo bài viết:", error);
        }
    };

    // Thay đổi file đính kèm
    const handleFileChange = (e) => {
        setAttachments(Array.from(e.target.files));
    };

    // Thêm bình luận
    const handleAddComment = async (postId, commentContent) => {
        try {
            if (!commentContent || commentContent.trim() === "") return; // Không cho phép bình luận rỗng
            const newComment = await addCommentToPost(postId, { content: commentContent });
            const updatedPosts = posts.map((post) =>
                post.postId === postId
                    ? {
                          ...post,
                          comments: [...post.comments, newComment],
                          newComment: "", // Xóa nội dung khung bình luận
                      }
                    : post
            );
            setPosts(updatedPosts);
        } catch (error) {
            console.error("Lỗi khi thêm bình luận:", error);
        }
    };

    const handleCreateExercise = () => {
        navigate(`/classroom/${id}/create-exercise`, { state: { roomName } }); // Điều hướng đến Create Exercise Page
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 px-4">
            <div className="max-w-3xl mx-auto space-y-6">
                {/* Hiển thị nút "Tạo bài tập mới" chỉ nếu là owner */}
                {isOwner && (
                    <div className="text-right mb-4">
                        <button
                            onClick={handleCreateExercise}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                        >
                            Tạo bài tập mới
                        </button>
                    </div>
                )}

                {/* Form tạo bài viết */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <textarea
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        placeholder="Nhập nội dung bài viết..."
                        className="w-full border rounded-lg p-2 mb-4"
                    />
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="mb-4"
                    />
                    <button
                        onClick={handleCreatePost}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Đăng bài viết
                    </button>
                </div>

                {/* Danh sách bài viết */}
                {posts.map((post) => (
                    <div key={post.postId} className="bg-white p-4 rounded-lg shadow-md">
                        <div className="flex items-center mb-4">
                            <img
                                src="/path/to/avatar.png" // Thay bằng link avatar
                                alt="Avatar"
                                className="w-10 h-10 rounded-full"
                            />
                            <div className="ml-4">
                                <h3 className="font-semibold">{post.createdBy}</h3>
                                <p className="text-sm text-gray-500">
                                    {new Date(post.createdAt).toLocaleString()}
                                </p>
                            </div>
                        </div>
                        <p className="mb-4">{post.content}</p>
                        {post.attachments && (
                            <div className="mb-4">
                                <h4 className="font-semibold">Tệp đính kèm:</h4>
                                {post.attachments.map((file, index) => (
                                    <a
                                        key={index}
                                        href={file.filePath}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block text-blue-500 underline"
                                    >
                                        {file.fileName}
                                    </a>
                                ))}
                            </div>
                        )}
                        <div className="mt-4">
                            <h4 className="font-semibold">Bình luận:</h4>
                            {post.comments.map((comment) => (
                                <div key={comment.commentId} className="border-t pt-2 mt-2">
                                    <p className="text-sm font-medium">{comment.userFullName}</p>
                                    <p className="text-sm">{comment.content}</p>
                                    <p className="text-xs text-gray-500">
                                        {new Date(comment.createdAt).toLocaleString()}
                                    </p>
                                </div>
                            ))}

                            {/* Form thêm bình luận */}
                            <div className="mt-4">
                                <textarea
                                    placeholder="Nhập bình luận..."
                                    className="w-full border rounded-lg p-2 mb-2"
                                    onChange={(e) => {
                                        const updatedPosts = posts.map((p) =>
                                            p.postId === post.postId
                                                ? { ...p, newComment: e.target.value }
                                                : p
                                        );
                                        setPosts(updatedPosts);
                                    }}
                                    value={post.newComment || ""} // Reset khung bình luận
                                />
                                <button
                                    onClick={() => handleAddComment(post.postId, post.newComment)}
                                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                                >
                                    Thêm bình luận
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClassroomDetailPage;
