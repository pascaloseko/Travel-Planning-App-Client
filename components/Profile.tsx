import React, { useState, ChangeEvent, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { DEV_SERVER_URL } from "../config";
import useToast from "../hooks/toast";

enum PreviewImageType {
  StringByte = "stringByte",
  String = "string",
}

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState<string>(user.username);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(
    user.profile_image
  );
  const [previewImageType, setPreviewImageType] =
    useState<PreviewImageType | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    if (imageSrc) {
      URL.revokeObjectURL(imageSrc);
    }
  }, [imageSrc]);

  useEffect(() => {
    if (user.profile_image) {
      const blob = base64ToBlob(user.profile_image);
      const objectURL = URL.createObjectURL(blob);
      setImageSrc(objectURL);
    }
  }, [user.profile_image]);

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

  const base64ToBlob = (base64String: string): Blob => {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array<number>(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: "image/*" });
  };

  const showToastNotification = (message: string, type: "success" | "error") => {
    showToast(message, type);
  };

  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();
      formData.append("profile_image", profilePicture!);

      const response = await fetch(
        `${DEV_SERVER_URL}/api/v1/protected/upload-profile`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const responseData = await response.json();

        setProfilePicture(profilePicture);

        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(profilePicture);

        if (responseData) {
          showToastNotification("Profile image added", "success");
        } else {
          showToastNotification("Error uploading image", "error");
        }
      }
    } catch (error) {
      showToastNotification("Failed to save data. Please try again.", "error");
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
        {previewImage && (
          <img
            src={
              previewImageType === PreviewImageType.String
                ? previewImage
                : imageSrc || ""
            }
            alt="Preview"
            className="mt-2 mb-4 w-32 h-32 object-cover rounded-full"
          />
        )}
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
      <button
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        onClick={handleSaveChanges}
      >
        Save Changes
      </button>
    </div>
  );
};

export default Profile;
