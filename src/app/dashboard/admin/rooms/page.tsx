"use client";

import React, { useState } from "react";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { ROOMS_DATA, RoomItem } from "@/data/roomsData";
import { formatPKR } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bed, Plus, Edit, Trash2, CheckCircle2, Wrench, Eye, Crown } from "lucide-react";
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
    <div className="flex min-h-[calc(100vh-5rem)] bg-[#070709] text-slate-100">
      <AdminSidebar />

      <main className="flex-grow p-6 sm:p-10 space-y-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-amber-500/20 pb-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 font-bold text-xs uppercase tracking-wider border border-amber-500/30">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              Inventory Control
            </span>
            <h1 className="text-3xl font-extrabold font-serif text-white mt-2">
              Rooms & Capacity Management
            </h1>
            <p className="text-xs text-slate-400">Manage room rates, bed occupancy, and maintenance status</p>
          </div>
          <Button onClick={() => setShowAddModal(true)} size="sm" className="font-black text-xs bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-300 shadow-md">
            <Plus className="w-4 h-4 mr-1.5 text-slate-950" />
            Add New Room
          </Button>
        </div>

        {/* Add Room Modal */}
        {showAddModal && (
          <Card className="border-amber-500/35 shadow-2xl p-6 space-y-4 max-w-lg mx-auto bg-[#0c0c10]">
            <CardHeader className="p-0">
              <CardTitle className="text-lg font-serif text-white">Add New Room to Hostel Inventory</CardTitle>
            </CardHeader>
            <form onSubmit={handleAddRoom} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Room Number *</label>
                <Input
                  required
                  placeholder="e.g. 305"
                  value={newRoomNumber}
                  onChange={(e) => setNewRoomNumber(e.target.value)}
                  className="bg-slate-950 border-amber-500/30 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Room Type</label>
                  <select
                    value={newRoomType}
                    onChange={(e) => setNewRoomType(e.target.value as any)}
                    className="w-full h-11 rounded-xl border border-amber-500/30 bg-slate-950 px-3 text-xs text-white"
                  >
                    <option value="SINGLE">Single Executive</option>
                    <option value="DOUBLE">Deluxe Double</option>
                    <option value="TRIPLE">Triple Economy</option>
                    <option value="QUAD">Quad Student</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Monthly Rent (PKR)</label>
                  <Input
                    type="number"
                    value={newRent}
                    onChange={(e) => setNewRent(Number(e.target.value))}
                    className="bg-slate-950 border-amber-500/30 text-white font-mono"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setShowAddModal(false)} className="w-1/2 border-amber-500/30 text-amber-300">
                  Cancel
                </Button>
                <Button type="submit" className="w-1/2 font-black bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950">
                  Save Room
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Inventory Table */}
        <Card className="border-amber-500/25 bg-[#0c0c10]">
          <CardHeader>
            <CardTitle className="text-base font-serif text-white">Hostel Rooms Inventory ({rooms.length} Units)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="border-b border-amber-500/20 text-amber-400/80 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3 px-4">Room Details</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Capacity</th>
                    <th className="py-3 px-4">Monthly Rent</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-500/10">
                  {rooms.map((room) => (
                    <tr key={room.id} className="hover:bg-slate-950/40">
                      <td className="py-3.5 px-4 font-bold text-white">{room.title}</td>
                      <td className="py-3.5 px-4"><Badge variant="outline">{room.roomType}</Badge></td>
                      <td className="py-3.5 px-4 text-slate-300">{room.capacity} Resident ({room.availableBeds} Available)</td>
                      <td className="py-3.5 px-4 font-black text-amber-400 font-mono">{formatPKR(room.monthlyRentPKR)}</td>
                      <td className="py-3.5 px-4">
                        <Badge variant={room.badge === "Under Maintenance" ? "destructive" : "gold"}>
                          {room.badge}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <Button onClick={() => toggleRoomStatus(room.id)} variant="outline" size="sm" className="text-[10px] border-amber-500/30 text-amber-300">
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
