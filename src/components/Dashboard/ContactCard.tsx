// @ts-nocheck

import React, { useState } from 'react';
import { Phone, MapPin, Globe, Mail, Briefcase, UserCircle, Pencil, Lock, Eye, EyeOff } from 'lucide-react';
import { useGetCurrentUserQuery, useUpdateProfileMutation, useUpdatePasswordMutation } from '@/lib/feature/auth/auththunk';
import { toast ,Toaster} from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ContactCard = () => {
  const { data: user, isLoading } = useGetCurrentUserQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const [updatePassword] = useUpdatePasswordMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  
  // Password visibility states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    companyRole: '',
    phone: '',
    state: '',
    country: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  if (isLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  const handleEdit = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      companyName: user?.companyName || '',
      companyRole: user?.companyRole || '',
      phone: user?.phone || '',
      state: user?.state || '',
      country: user?.country || ''
    });
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setPasswordError('');
    setPasswordSuccess('');
    setIsModalOpen(true);
  };

  const handleProfileSubmit = async () => {
    try {
      await updateProfile(formData).unwrap();
      setIsModalOpen(false);
      // Using promise to ensure toast is shown
      Promise.resolve().then(() => {
        toast.success("Profile updated successfully", {
          position: "top-right",
          duration: 3000,
        });
      });
    } catch (err) {
      console.error('Failed to update profile:', err);
      // Using promise to ensure toast is shown
      Promise.resolve().then(() => {
        toast.error("Failed to update profile", {
          position: "top-right",
          duration: 3000,
        });
      });
    }
  };


  const handlePasswordSubmit = async () => {
    setPasswordError('');
    setPasswordSuccess('');

    // Validation
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordError('All password fields are required');
      toast.error("All password fields are required", {
        position: "top-right",
        duration: 3000,
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long');
      toast.error("New password must be at least 6 characters long", {
        position: "top-right",
        duration: 3000,
      });
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match');
      toast.error("New passwords do not match", {
        position: "top-right",
        duration: 3000,
      });
      return;
    }

  }
  const contactInfo = [
    [
      {
        icon: <UserCircle className="w-4 h-4" />,
        text: `${user?.firstName} ${user?.lastName}`,
        label: "Full Name"
      },
      {
        icon: <Mail className="w-4 h-4" />,
        text: user?.email,
        link: `mailto:${user?.email}`,
        label: "Email"
      }
    ],
    [
      {
        icon: <Briefcase className="w-4 h-4" />,
        text: user?.companyName,
        label: "Company"
      },
      {
        icon: <Globe className="w-4 h-4" />,
        text: user?.companyRole,
        label: "Role"
      }
    ],
    [
      {
        icon: <Phone className="w-4 h-4" />,
        text: user?.phone || 'Not provided',
        link: user?.phone ? `tel:${user.phone}` : null,
        label: "Phone"
      },
      {
        icon: <MapPin className="w-4 h-4" />,
        text: `${user?.state || ''}, ${user?.country || ''}`.trim() || 'Location not provided',
        label: "Location"
      }
    ]
  ];

  return (
    <>
      <div className="bg-white rounded-lg shadow-md w-full max-w-lg">
      <Toaster />

        <div className="bg-gradient-to-r from-[#f97316] to-orange-400 p-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-white">Profile Information</h2>
            <p className="text-orange-100 text-sm">User Type: {user?.userType}</p>
          </div>
          <button 
            onClick={handleEdit}
            className="p-2 rounded-full hover:bg-orange-500 transition-colors duration-200"
          >
            <Pencil className="w-4 h-4 text-white" />
          </button>
        </div>

        <div className="p-2">
          <div className="space-y-3">
            {contactInfo.map((row, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-2 gap-2">
                {row.map((item, colIndex) => (
                  <div
                    key={colIndex}
                    className="flex items-center space-x-3 hover:bg-orange-50 p-2 rounded-lg transition-colors duration-200"
                  >
                    <div className="text-[#f97316]">
                      {item.icon}
                    </div>
                    <div className="flex flex-col flex-1">
                      <span className="text-xs text-gray-500">{item.label}</span>
                      {item.link ? (
                        <a
                          href={item.link}
                          className="text-gray-700 text-sm hover:text-[#f97316] transition-colors duration-200"
                        >
                          {item.text}
                        </a>
                      ) : (
                        <span className="text-gray-700 text-sm">
                          {item.text}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Profile Information</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Profile Info</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        firstName: e.target.value
                      }))}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        lastName: e.target.value
                      }))}
                    />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      companyName: e.target.value
                    }))}
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label htmlFor="companyRole">Role</Label>
                  <Input
                    id="companyRole"
                    value={formData.companyRole}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      companyRole: e.target.value
                    }))}
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      phone: e.target.value
                    }))}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        state: e.target.value
                      }))}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        country: e.target.value
                      }))}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm text-gray-600 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleProfileSubmit}
                  className="px-4 py-2 text-sm text-white bg-[#f97316] rounded hover:bg-orange-600 ml-2"
                >
                  Save Changes
                </button>
              </DialogFooter>
            </TabsContent>

            <TabsContent value="password">
        <div className="grid gap-4 py-4">
          {passwordError && (
            <Alert variant="destructive">
              <AlertDescription>{passwordError}</AlertDescription>
            </Alert>
          )}
          {passwordSuccess && (
            <Alert>
              <AlertDescription>{passwordSuccess}</AlertDescription>
            </Alert>
          )}
          <div className="flex flex-col gap-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData(prev => ({
                  ...prev,
                  currentPassword: e.target.value
                }))}
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData(prev => ({
                  ...prev,
                  newPassword: e.target.value
                }))}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData(prev => ({
                  ...prev,
                  confirmPassword: e.target.value
                }))}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 text-sm text-gray-600 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handlePasswordSubmit}
            className="px-4 py-2 text-sm text-white bg-[#f97316] rounded hover:bg-orange-600 ml-2"
          >
            Update Password
          </button>
        </DialogFooter>
      </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContactCard;