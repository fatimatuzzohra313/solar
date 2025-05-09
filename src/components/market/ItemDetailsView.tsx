// @ts-nocheck

import React from 'react';
import { Eye, ChevronLeft, MessageSquare, User, Phone, Mail, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ItemDetailsView = ({ item }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [message, setMessage] = React.useState('');

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const getBadgeStyle = (type) => {
    return {
      backgroundColor: type === "Sell" ? "#232b47" : "#f97316",
      color: "white"
    };
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      window.location.href = `mailto:${item.createdBy?.email}?body=${encodeURIComponent(message)}`;
      setMessage('');
    }
  };

  return (
    <>
      <Button
        onClick={() => setShowModal(true)}
        variant="ghost"
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
      >
        <Eye className="h-4 w-4" />
        View Details
      </Button>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-5xl">
          <DialogHeader className="space-y-4">
            <div className="flex items-center">
              <DialogTitle className="text-2xl font-bold">
                {item.manufacturer} {item.category}
              </DialogTitle>
              <Badge 
                className="text-sm px-3 py-1 ml-3" 
                style={getBadgeStyle(item.listingType)}
              >
                {item.listingType === "Sell" ? "Need to Sell" : "Need to Buy"}
              </Badge>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-green-600">
                {formatPrice(item.price)}
              </span>
              <span className="text-gray-600">
                Quantity: {" "}
                <span className="text-[#f97316] font-bold text-xl">{item.quantity}</span>
              </span>
            </div>
          </DialogHeader>

          <div className="grid gap-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="pictures">Pictures</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                  </TabsList>

                  <TabsContent value="details">
                    <Card>
                      <CardContent className="grid gap-6 p-6">
                        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                          {[
                            { label: "Condition", value: item.condition },
                            { label: "Warranty", value: item.warranty },
                            { label: "Location", value: item.location },
                            { label: "Message", value: item.message },

                            ...(item.createdBy?.userType === "Solar" ? [{ label: "Wattage", value: item.sku }] : []),
                          ].map(({ label, value }) => (
                            <div key={label} className="space-y-1">
                              <h4 className="text-sm font-medium text-gray-500">{label}</h4>
                              <p className="text-gray-900">{value}</p>
                            </div>
                          ))}
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-gray-500">Description</h4>
                          <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                            {item.additionalComments || "No description available"}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="pictures">
                    <Card>
                      <CardContent className="p-6">
                        {selectedImage ? (
                          <div className="relative space-y-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedImage(null)}
                              className="absolute left-2 top-2 z-10"
                            >
                              <ChevronLeft className="h-4 w-4 mr-1" />
                              Back to Gallery
                            </Button>
                            <img
                              src={selectedImage}
                              alt="Selected"
                              className="h-auto max-h-[70vh] w-full rounded-lg object-contain bg-gray-50"
                            />
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {item.pictures?.map((pic, index) => (
                              <button
                                key={index}
                                onClick={() => setSelectedImage(pic.imageUrl)}
                                className="group relative aspect-square overflow-hidden rounded-lg bg-gray-50"
                              >
                                <img
                                  src={pic.imageUrl}
                                  alt={pic.fileName}
                                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-300 group-hover:bg-opacity-10" />
                              </button>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="documents">
                    <Card>
                      <CardContent className="p-6">
                        {item.attachedFiles?.length > 0 ? (
                          <div className="grid gap-3">
                            {item.attachedFiles.map((doc, index) => (
                              <a
                                key={index}
                                href={doc.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-gray-50 group"
                              >
                                <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-blue-500" />
                                <div className="flex-1">
                                  <p className="font-medium text-gray-900 group-hover:text-blue-600">{doc.fileName}</p>
                                  <p className="text-sm text-gray-500">Click to view or download</p>
                                </div>
                              </a>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            <p>No documents available</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="text-lg">Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-900">{item.createdBy?.firstName} {item.createdBy?.lastName}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <a href={`mailto:${item.createdBy?.email}`} className="text-blue-600 hover:underline">
                        {item.createdBy?.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <a href={`tel:${item.createdBy?.phoneNumber}`} className="text-blue-600 hover:underline">
                        {item.createdBy?.phoneNumber}
                      </a>
                    </div>
                   
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full gap-2" 
                    size="lg"
                    onClick={handleSendMessage}
                  >
                    <MessageSquare className="h-4 w-4" />
                    Contact Info
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ItemDetailsView;