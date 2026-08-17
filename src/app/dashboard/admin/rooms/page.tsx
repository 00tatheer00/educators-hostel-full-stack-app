"use client";

import React, { useState } from "react";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { ROOMS_DATA, RoomItem } from "@/data/roomsData";
import { formatPKR } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bed, Plus, Edit, Trash2, CheckCircle2, Wrench, Eye } from "lucide-react";
import { toast } from "sonner";

export default function AdminRoomsPage() {
  const [rooms, setRooms] = useState<RoomItem[]>(ROOMS_DATA);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRoomNumber, setNewRoomNumber] = useState("");
  const [newRoomType, setNewRoomType] = useState<"SINGLE" | "DOUBLE" | "TRIPLE" | "QUAD">("SINGLE");
  const [newRent, setNewRent] = useState(25000);

  const handleAddRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomNumber) return;

    const createdRoom: RoomItem = {
      id: `room-${Date.now()}`,
      title: `Room ${newRoomNumber} (${newRoomType} Suite)`,
      titleUrdu: `کمرہ ${newRoomNumber}`,
      roomType: newRoomType,
      capacity: newRoomType === "SINGLE" ? 1 : newRoomType === "DOUBLE" ? 2 : 3,
      availableBeds: newRoomType === "SINGLE" ? 1 : 2,
      monthlyRentPKR: Number(newRent),
      securityDepositPKR: 8000,
      badge: "Newly Added",
      badgeUrdu: "نیا کمرہ",
      images: ["https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80"],
      description: "Newly added room on the 2nd floor with AC and attached bath.",
      descriptionUrdu: "نیا کمرہ۔",
      specifications: {
        floor: "2nd Floor",
        bathType: "Attached Bath",
        acType: "DC Inverter AC",
        wifiSpeed: "High Speed Fiber",
        messMeals: "3 Meals Included",
      },
      amenities: ["Attached Bath", "AC", "Study Desk", "Wi-Fi"],
      amenitiesUrdu: ["اٹیچڈ باتھ", "اے سی", "اسٹڈی ڈیسک", "وائی فائی"],
      reviews: [],
    };

    setRooms([createdRoom, ...rooms]);
    setShowAddModal(false);
    setNewRoomNumber("");
    toast.success(`Room ${newRoomNumber} added to inventory!`);
  };

  const toggleRoomStatus = (id: string) => {
    setRooms(
      rooms.map((r) => {
        if (r.id === id) {
          const nextStatus = r.badge === "Under Maintenance" ? "Available" : "Under Maintenance";
          return { ...r, badge: nextStatus };
        }
        return r;
      })
    );
    toast.info("Room status updated.");
  };

  return (
    <div className="flex min-h-[calc(100vh-5rem)]">
      <AdminSidebar />

      <main className="flex-grow p-6 sm:p-10 space-y-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <Badge variant="gold">Inventory Control</Badge>
            <h1 className="text-3xl font-extrabold font-serif text-slate-900 dark:text-slate-100 mt-1">
              Rooms & Capacity Management
            </h1>
            <p className="text-xs text-slate-500">Manage room rates, bed occupancy, and maintenance status</p>
          </div>
          <Button onClick={() => setShowAddModal(true)} variant="emerald" size="sm" className="font-semibold text-xs">
            <Plus className="w-4 h-4 mr-1.5" />
            Add New Room
          </Button>
        </div>

        {/* Add Room Modal */}
        {showAddModal && (
          <Card className="border-emerald-800/30 shadow-2xl p-6 space-y-4 max-w-lg mx-auto bg-white dark:bg-slate-900">
            <CardHeader className="p-0">
              <CardTitle className="text-lg font-serif">Add New Room to Hostel Inventory</CardTitle>
            </CardHeader>
            <form onSubmit={handleAddRoom} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold">Room Number *</label>
                <Input
                  required
                  placeholder="e.g. 305"
                  value={newRoomNumber}
                  onChange={(e) => setNewRoomNumber(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-semibold">Room Type</label>
                  <select
                    value={newRoomType}
                    onChange={(e) => setNewRoomType(e.target.value as any)}
                    className="w-full h-11 rounded-xl border border-input bg-background px-3 text-xs"
                  >
                    <option value="SINGLE">Single Executive</option>
                    <option value="DOUBLE">Deluxe Double</option>
                    <option value="TRIPLE">Triple Economy</option>
                    <option value="QUAD">Quad Student</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold">Monthly Rent (PKR)</label>
                  <Input
                    type="number"
                    value={newRent}
                    onChange={(e) => setNewRent(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setShowAddModal(false)} className="w-1/2">
                  Cancel
                </Button>
                <Button type="submit" variant="emerald" className="w-1/2 font-semibold">
                  Save Room
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Inventory Table */}
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle className="text-base font-serif">Hostel Rooms Inventory ({rooms.length} Units)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3 px-4">Room Details</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Capacity</th>
                    <th className="py-3 px-4">Monthly Rent</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {rooms.map((room) => (
                    <tr key={room.id}>
                      <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-slate-100">{room.title}</td>
                      <td className="py-3.5 px-4"><Badge variant="outline">{room.roomType}</Badge></td>
                      <td className="py-3.5 px-4">{room.capacity} Resident ({room.availableBeds} Available)</td>
                      <td className="py-3.5 px-4 font-bold text-emerald-800 dark:text-emerald-400">{formatPKR(room.monthlyRentPKR)}</td>
                      <td className="py-3.5 px-4">
                        <Badge variant={room.badge === "Under Maintenance" ? "destructive" : "emerald"}>
                          {room.badge}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <Button onClick={() => toggleRoomStatus(room.id)} variant="outline" size="sm" className="text-[10px]">
                          Toggle Status
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
