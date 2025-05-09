// @ts-nocheck

"use client";

import { JSXElementConstructor, PromiseLikeOfReactNode, ReactElement, ReactNode, useState } from "react";
import { useDeleteJoinRequestMutation ,  useGetAllJoinRequestsQuery,
    useUpdateJoinRequestStatusMutation, } from "@/lib/feature/auth/auththunk";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MoreHorizontal, 
  Trash2, 
  Building2, 
  User, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  XCircle,
  Clock 
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function AdminJoinRequests() {
  const { data: requests, isLoading, isError } = useGetAllJoinRequestsQuery();
  const [updateStatus] = useUpdateJoinRequestStatusMutation();
  const [deleteRequest] = useDeleteJoinRequestMutation();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-orange-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="p-">
          <CardTitle className="text-red-500">Error</CardTitle>
          <CardDescription>Failed to load join requests</CardDescription>
        </Card>
      </div>
    );
  }

  const handleStatusChange = async (id: any, status: string) => {
    try {
      await updateStatus({ id, status }).unwrap();
    } catch (error) {
      alert("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    setSelectedRequest(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteRequest(selectedRequest).unwrap();
      setDeleteDialogOpen(false);
    } catch (error) {
      alert("Failed to delete request");
    }
  };

  const getStatusBadge = (status: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | PromiseLikeOfReactNode | null | undefined) => {
    const statusConfig = {
      pending: {
        className: "bg-yellow-100 text-yellow-800 border-yellow-500",
        icon: Clock,
      },
      approved: {
        className: "bg-green-100 text-green-800 border-green-500",
        icon: CheckCircle2,
      },
      rejected: {
        className: "bg-red-100 text-red-800 border-red-500",
        icon: XCircle,
      },
    };

    const config = statusConfig[status];
    const StatusIcon = config.icon;

    return (
      <Badge className={`${config.className} flex items-center gap-1 px-3 py-1 border`}>
        <StatusIcon className="h-3 w-3" />
        <span className="capitalize">{status}</span>
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="container mx-auto py-8">
        <Card className="bg-white shadow-lg">
          <CardHeader className="border-b bg-gray-50/80">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold text-gray-800">Join Requests</CardTitle>
                <CardDescription className="mt-2 text-gray-600">
                  Manage membership requests from solar companies
                </CardDescription>
              </div>
              <Badge className="px-3 py-1">
                Total Requests: {requests?.data.length || 0}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-">
            <div className="rounded-lg border border-gray-200">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="w-1/5">Company Details</TableHead>
                    <TableHead className="w-1/6">Contact Person</TableHead>
                    <TableHead className="w-1/6">Email</TableHead>
                    <TableHead className="w-1/6">Location</TableHead>
                    <TableHead className="w-1/6">Role</TableHead>
                    <TableHead className="w-1/8">Status</TableHead>
                    <TableHead className="w-1/12 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests?.data.map((request) => (
                    <TableRow key={request._id} className="hover:bg-gray-50/50">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-gray-500" />
                          <span className="font-medium text-gray-900">
                            {request.companyName}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <span>
                            {request.firstName} {request.lastName}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-600">{request.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span>{request.state}, {request.country}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-normal">
                          {request.companyRole}
                        </Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(request._id, "approved")}
                              className="text-green-600"
                            >
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Approve Request
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(request._id, "rejected")}
                              className="text-red-600"
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Reject Request
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(request._id)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Request
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this join request? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete Request
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}