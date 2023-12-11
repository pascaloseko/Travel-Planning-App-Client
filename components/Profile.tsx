import React, { useState, ChangeEvent } from "react";
import { useAuth } from "../context/AuthContext";

enum PreviewImageType {
  StringByte = "stringByte",
  String = "string",
}

const Profile = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState<string>(user.username);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(
    user.profile_image
  );
  const [previewImageType, setPreviewImageType] =
    useState<PreviewImageType | null>(null);

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleProfilePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setProfilePicture(file);
      setPreviewImageType(PreviewImageType.String);

      // preview the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setProfilePicture(null);
      setPreviewImage(null);
      setPreviewImageType(null);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white border rounded-md shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Profile</h1>

      {/* Profile Picture Upload */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Profile Picture
        </label>
        {previewImage ? (
          <img
            src={
              previewImageType === PreviewImageType.String
                ? previewImage
                : `data:image/png;base64,${previewImage}`
            }
            alt="Preview"
            className="mt-2 mb-4 w-32 h-32 object-cover rounded-full"
          />
        ) : null}
        <input
          type="file"
          accept="image/*"
          onChange={handleProfilePictureChange}
          className="py-2 px-3 border border-gray-300 rounded-md w-full"
        />
      </div>

      {/* Update User Details */}
      <div>
        <label className="block text-sm font-medium text-gray-600">
          Username
        </label>
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          className="mt-2 py-2 px-3 border border-gray-300 rounded-md w-full"
        />
      </div>

      {/* Save Button */}
      <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
        Save Changes
      </button>
    </div>
  );
};

export default Profile;
