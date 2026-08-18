"use client";

import React, { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { RoomItem } from "@/data/roomsData";
import { formatPKR } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Bed,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  Wrench,
  Eye,
  Crown,
  Search,
  SlidersHorizontal,
  Image as ImageIcon,
  Check,
  X,
  LayoutGrid,
  Table as TableIcon,
} from "lucide-react";
import { toast } from "sonner";
import {
  subscribeToRooms,
  addRoom,
  updateRoom,
  deleteRoom,
} from "@/lib/firestoreService";

export default function AdminRoomsPage() {
  const [rooms, setRooms] = useState<RoomItem[]>([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("ALL");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  // Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState<RoomItem | null>(null);
  const [deletingRoomId, setDeletingRoomId] = useState<string | null>(null);

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
    title: "",
    titleUrdu: "",
    roomType: "SINGLE" as "SINGLE" | "DOUBLE" | "TRIPLE" | "QUAD",
    capacity: 1,
    availableBeds: 1,
    monthlyRentPKR: 25000,
    securityDepositPKR: 8000,
    badge: "Available",
    badgeUrdu: "دستیاب",
    floor: "2nd Floor",
    bathType: "Private Attached Bathroom",
    acType: "1.5 Ton DC Inverter",
    wifiSpeed: "High Speed Fiber",
    messMeals: "3 Meals Included",
    imageUrl: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
    description: "Spacious and fully furnished room with inverter AC, study desk, and attached bath.",
  });

  useEffect(() => {
    const unsub = subscribeToRooms(setRooms);
    return () => unsub();
  }, []);

  const resetForm = () => {
    setFormData({
      title: "",
      titleUrdu: "",
      roomType: "SINGLE",
      capacity: 1,
      availableBeds: 1,
      monthlyRentPKR: 25000,
      securityDepositPKR: 8000,
      badge: "Available",
      badgeUrdu: "دستیاب",
      floor: "2nd Floor",
      bathType: "Private Attached Bathroom",
      acType: "1.5 Ton DC Inverter",
      wifiSpeed: "High Speed Fiber",
      messMeals: "3 Meals Included",
      imageUrl: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
      description: "Spacious and fully furnished room with inverter AC, study desk, and attached bath.",
    });
  };

  const handleOpenAdd = () => {
    resetForm();
    setShowAddModal(true);
  };

  const handleOpenEdit = (room: RoomItem) => {
    setEditingRoom(room);
    setFormData({
      title: room.title,
      titleUrdu: room.titleUrdu || "",
      roomType: room.roomType,
      capacity: room.capacity,
      availableBeds: room.availableBeds,
      monthlyRentPKR: room.monthlyRentPKR,
      securityDepositPKR: room.securityDepositPKR,
      badge: room.badge,
      badgeUrdu: room.badgeUrdu || "",
      floor: room.specifications?.floor || "2nd Floor",
      bathType: room.specifications?.bathType || "Attached Bath",
      acType: room.specifications?.acType || "Inverter AC",
      wifiSpeed: room.specifications?.wifiSpeed || "High Speed Fiber",
      messMeals: room.specifications?.messMeals || "3 Meals Included",
      imageUrl: room.images[0] || "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
      description: room.description,
    });
  };

  const handleSaveAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      toast.error("Please provide a room title.");
      return;
    }

    const newRoom: Omit<RoomItem, "id"> = {
      title: formData.title,
      titleUrdu: formData.titleUrdu || formData.title,
      roomType: formData.roomType,
      capacity: Number(formData.capacity),
      availableBeds: Number(formData.availableBeds),
      monthlyRentPKR: Number(formData.monthlyRentPKR),
      securityDepositPKR: Number(formData.securityDepositPKR),
      badge: formData.badge,
      badgeUrdu: formData.badgeUrdu || formData.badge,
      images: [formData.imageUrl],
      description: formData.description,
      descriptionUrdu: "مکمل فرنشڈ ہاسٹل روم۔",
      specifications: {
        floor: formData.floor,
        bathType: formData.bathType,
        acType: formData.acType,
        wifiSpeed: formData.wifiSpeed,
        messMeals: formData.messMeals,
      },
      amenities: ["Attached Bath", "AC", "Study Desk", "Wi-Fi", "Mess Meals"],
      amenitiesUrdu: ["اٹیچڈ باتھ", "اے سی", "اسٹڈی ڈیسک", "وائی فائی"],
      reviews: [],
    };

    await addRoom(newRoom);
    setShowAddModal(false);
    resetForm();
    toast.success(`Room '${formData.title}' added to inventory & live database!`);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRoom) return;

    const updates: Partial<RoomItem> = {
      title: formData.title,
      titleUrdu: formData.titleUrdu,
      roomType: formData.roomType,
      capacity: Number(formData.capacity),
      availableBeds: Number(formData.availableBeds),
      monthlyRentPKR: Number(formData.monthlyRentPKR),
      securityDepositPKR: Number(formData.securityDepositPKR),
      badge: formData.badge,
      description: formData.description,
      images: [formData.imageUrl, ...(editingRoom.images.slice(1) || [])],
      specifications: {
        ...editingRoom.specifications,
        floor: formData.floor,
        bathType: formData.bathType,
        acType: formData.acType,
      },
    };

    await updateRoom(editingRoom.id, updates);
    setEditingRoom(null);
    toast.success(`Room '${formData.title}' successfully updated in real-time!`);
  };

  const handleDelete = async (id: string) => {
    await deleteRoom(id);
    setDeletingRoomId(null);
    toast.success("Room successfully deleted from inventory.");
  };

  const toggleStatus = async (room: RoomItem) => {
    const nextStatus = room.badge === "Under Maintenance" ? "Available" : "Under Maintenance";
    await updateRoom(room.id, { badge: nextStatus });
    toast.info(`Room ${room.title} is now '${nextStatus}'`);
  };

  // Filtering
  const filteredRooms = rooms.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.specifications?.floor.toLowerCase().includes(search.toLowerCase()) ||
      r.roomType.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "ALL" || r.roomType === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="flex min-h-[calc(100vh-5rem)] bg-[#070709] text-slate-100">
      <AdminSidebar />

      <main className="flex-grow p-4 sm:p-8 space-y-6 overflow-y-auto">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-amber-500/20 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/15 text-amber-300 font-bold text-[10px] uppercase tracking-wider border border-amber-500/30 shadow-sm">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                Inventory & Capacity CRUD
              </span>
              <Badge variant="gold" className="text-[10px]">{rooms.length} Total Rooms</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-white mt-1.5">
              Hostel Rooms Management
            </h1>
            <p className="text-xs text-slate-400">Add new rooms, edit monthly rent, toggle maintenance, and manage bed capacity</p>
          </div>

          <Button
            onClick={handleOpenAdd}
            size="sm"
            className="font-black text-xs bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-300 shadow-lg shadow-amber-500/25"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            + Add New Room
          </Button>
        </div>

        {/* Filter & View Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-amber-400 absolute left-3 top-3" />
              <Input
                placeholder="Search rooms, floors..."
                className="pl-8 h-9 text-xs bg-slate-950 border-amber-500/30 text-white"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="h-9 px-3 text-xs rounded-xl border border-amber-500/30 bg-slate-950 text-slate-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500"
            >
              <option value="ALL">All Categories</option>
              <option value="SINGLE">Single Executive</option>
              <option value="DOUBLE">Deluxe Double</option>
              <option value="TRIPLE">Triple Economy</option>
              <option value="QUAD">Quad Student</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 self-end sm:self-auto">
            <Button
              variant={viewMode === "table" ? "secondary" : "outline"}
              size="sm"
              onClick={() => setViewMode("table")}
              className={`h-8 px-2.5 text-xs ${viewMode === "table" ? "bg-amber-500 text-slate-950 font-bold" : "border-amber-500/30 text-slate-300"}`}
            >
              <TableIcon className="w-3.5 h-3.5 mr-1" />
              Table
            </Button>
            <Button
              variant={viewMode === "grid" ? "secondary" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className={`h-8 px-2.5 text-xs ${viewMode === "grid" ? "bg-amber-500 text-slate-950 font-bold" : "border-amber-500/30 text-slate-300"}`}
            >
              <LayoutGrid className="w-3.5 h-3.5 mr-1" />
              Grid
            </Button>
          </div>
        </div>

        {/* View 1: Table View */}
        {viewMode === "table" ? (
          <Card className="border-amber-500/25 bg-[#0c0c10]">
            <CardHeader className="py-4">
              <CardTitle className="text-base font-serif text-white">
                Hostel Rooms Inventory ({filteredRooms.length} Displayed)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="border-b border-amber-500/20 text-amber-400/80 uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="py-3 px-4">Room Details</th>
                      <th className="py-3 px-4">Floor</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Capacity</th>
                      <th className="py-3 px-4">Monthly Rent</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-500/10">
                    {filteredRooms.map((room) => (
                      <tr key={room.id} className="hover:bg-slate-950/50">
                        <td className="py-3.5 px-4 font-bold text-white flex items-center gap-3">
                          <img
                            src={room.images[0]}
                            alt={room.title}
                            className="w-10 h-10 rounded-lg object-cover border border-amber-500/30 shrink-0"
                          />
                          <div>
                            <span className="block font-bold">{room.title}</span>
                            <span className="text-[10px] text-slate-400">{room.specifications?.bathType}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-slate-300 font-medium">
                          {room.specifications?.floor || "2nd Floor"}
                        </td>
                        <td className="py-3.5 px-4">
                          <Badge variant="outline">{room.roomType}</Badge>
                        </td>
                        <td className="py-3.5 px-4 text-slate-300">
                          {room.capacity} Bed ({room.availableBeds} Vacant)
                        </td>
                        <td className="py-3.5 px-4 font-black text-amber-400 font-mono">
                          {formatPKR(room.monthlyRentPKR)}
                        </td>
                        <td className="py-3.5 px-4">
                          <Badge
                            variant={
                              room.badge === "Under Maintenance"
                                ? "destructive"
                                : room.badge === "Most Popular"
                                ? "gold"
                                : "outline"
                            }
                          >
                            {room.badge}
                          </Badge>
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-1.5">
                          <Button
                            onClick={() => toggleStatus(room)}
                            variant="outline"
                            size="sm"
                            className="text-[10px] h-7 px-2 border-amber-500/30 text-amber-300 hover:bg-amber-500/10"
                            title="Toggle Status"
                          >
                            <Wrench className="w-3 h-3" />
                          </Button>
                          <Button
                            onClick={() => handleOpenEdit(room)}
                            variant="outline"
                            size="sm"
                            className="text-[10px] h-7 px-2 border-amber-500/30 text-amber-300 hover:bg-amber-500/10"
                            title="Edit Room"
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            onClick={() => setDeletingRoomId(room.id)}
                            variant="destructive"
                            size="sm"
                            className="text-[10px] h-7 px-2"
                            title="Delete Room"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* View 2: Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.map((room) => (
              <Card key={room.id} className="border-amber-500/25 bg-[#0c0c10] overflow-hidden flex flex-col justify-between">
                <div className="relative h-44 w-full">
                  <img
                    src={room.images[0]}
                    alt={room.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 right-2.5">
                    <Badge variant={room.badge === "Under Maintenance" ? "destructive" : "gold"}>
                      {room.badge}
                    </Badge>
                  </div>
                  <div className="absolute bottom-2.5 left-2.5 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-amber-500/30 font-mono font-bold text-amber-300 text-xs">
                    {formatPKR(room.monthlyRentPKR)} / mo
                  </div>
                </div>

                <CardContent className="p-4 space-y-3 flex-grow flex flex-col justify-between text-xs">
                  <div>
                    <h3 className="font-bold text-sm text-white">{room.title}</h3>
                    <p className="text-slate-400 text-[11px] mt-1 line-clamp-2">{room.description}</p>
                    <div className="flex justify-between items-center text-[11px] text-slate-300 pt-2 border-t border-amber-500/15 mt-3">
                      <span>Floor: {room.specifications?.floor}</span>
                      <span>{room.availableBeds} of {room.capacity} Beds Available</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-amber-500/15">
                    <Button
                      onClick={() => handleOpenEdit(room)}
                      variant="outline"
                      size="sm"
                      className="w-1/2 text-xs border-amber-500/30 text-amber-300 hover:bg-amber-500/10"
                    >
                      <Edit className="w-3.5 h-3.5 mr-1" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => setDeletingRoomId(room.id)}
                      variant="destructive"
                      size="sm"
                      className="w-1/2 text-xs"
                    >
                      <Trash2 className="w-3.5 h-3.5 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* MODAL 1: Add New Room Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <Card className="border-amber-500/40 shadow-2xl p-6 space-y-4 max-w-xl w-full bg-[#0c0c10] my-8">
              <div className="flex justify-between items-center border-b border-amber-500/20 pb-3">
                <CardTitle className="text-lg font-serif text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-amber-400" />
                  Add New Room to Hostel Inventory
                </CardTitle>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveAdd} className="space-y-4 text-xs max-h-[75vh] overflow-y-auto pr-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-300">Room Title (English) *</label>
                    <Input
                      required
                      placeholder="e.g. Room 305 (Single Executive)"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="bg-slate-950 border-amber-500/30 text-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-300">Room Title (Urdu)</label>
                    <Input
                      placeholder="کمرہ نمبر ۳۰۵"
                      value={formData.titleUrdu}
                      onChange={(e) => setFormData({ ...formData, titleUrdu: e.target.value })}
                      className="bg-slate-950 border-amber-500/30 text-white font-serif"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-300">Category</label>
                    <select
                      value={formData.roomType}
                      onChange={(e) => setFormData({ ...formData, roomType: e.target.value as any })}
                      className="w-full h-10 rounded-xl border border-amber-500/30 bg-slate-950 px-2 text-xs text-white"
                    >
                      <option value="SINGLE">Single</option>
                      <option value="DOUBLE">Double</option>
                      <option value="TRIPLE">Triple</option>
                      <option value="QUAD">Quad</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-300">Floor</label>
                    <Input
                      placeholder="e.g. 2nd Floor"
                      value={formData.floor}
                      onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                      className="bg-slate-950 border-amber-500/30 text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-300">Total Beds</label>
                    <Input
                      type="number"
                      value={formData.capacity}
                      onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
                      className="bg-slate-950 border-amber-500/30 text-white font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-300">Available Beds</label>
                    <Input
                      type="number"
                      value={formData.availableBeds}
                      onChange={(e) => setFormData({ ...formData, availableBeds: Number(e.target.value) })}
                      className="bg-slate-950 border-amber-500/30 text-white font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-300">Monthly Rent (PKR) *</label>
                    <Input
                      type="number"
                      required
                      value={formData.monthlyRentPKR}
                      onChange={(e) => setFormData({ ...formData, monthlyRentPKR: Number(e.target.value) })}
                      className="bg-slate-950 border-amber-500/30 text-white font-mono text-amber-400 font-bold"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-300">Security Deposit (PKR)</label>
                    <Input
                      type="number"
                      value={formData.securityDepositPKR}
                      onChange={(e) => setFormData({ ...formData, securityDepositPKR: Number(e.target.value) })}
                      className="bg-slate-950 border-amber-500/30 text-white font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Room Image URL</label>
                  <Input
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="bg-slate-950 border-amber-500/30 text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Description</label>
                  <textarea
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full rounded-xl border border-amber-500/30 bg-slate-950 p-2.5 text-xs text-white"
                  />
                </div>

                <div className="flex gap-3 pt-3 border-t border-amber-500/15">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddModal(false)}
                    className="w-1/2 border-amber-500/30 text-amber-300"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="w-1/2 font-black bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400"
                  >
                    Save & Publish Room
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        )}

        {/* MODAL 2: Edit Room Modal */}
        {editingRoom && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <Card className="border-amber-500/40 shadow-2xl p-6 space-y-4 max-w-xl w-full bg-[#0c0c10] my-8">
              <div className="flex justify-between items-center border-b border-amber-500/20 pb-3">
                <CardTitle className="text-lg font-serif text-white flex items-center gap-2">
                  <Edit className="w-4 h-4 text-amber-400" />
                  Edit Room: {editingRoom.title}
                </CardTitle>
                <button
                  onClick={() => setEditingRoom(null)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-4 text-xs max-h-[75vh] overflow-y-auto pr-1">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Room Title *</label>
                  <Input
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="bg-slate-950 border-amber-500/30 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-300">Monthly Rent (PKR)</label>
                    <Input
                      type="number"
                      required
                      value={formData.monthlyRentPKR}
                      onChange={(e) => setFormData({ ...formData, monthlyRentPKR: Number(e.target.value) })}
                      className="bg-slate-950 border-amber-500/30 text-white font-mono font-bold text-amber-400"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-300">Total Capacity</label>
                    <Input
                      type="number"
                      value={formData.capacity}
                      onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
                      className="bg-slate-950 border-amber-500/30 text-white font-mono"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-300">Available Beds</label>
                    <Input
                      type="number"
                      value={formData.availableBeds}
                      onChange={(e) => setFormData({ ...formData, availableBeds: Number(e.target.value) })}
                      className="bg-slate-950 border-amber-500/30 text-white font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-300">Floor Location</label>
                    <Input
                      value={formData.floor}
                      onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                      className="bg-slate-950 border-amber-500/30 text-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-300">Status Badge</label>
                    <select
                      value={formData.badge}
                      onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                      className="w-full h-10 rounded-xl border border-amber-500/30 bg-slate-950 px-2 text-xs text-white"
                    >
                      <option value="Available">Available</option>
                      <option value="Most Popular">Most Popular</option>
                      <option value="Best Value">Best Value</option>
                      <option value="Under Maintenance">Under Maintenance</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Photo URL</label>
                  <Input
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="bg-slate-950 border-amber-500/30 text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Description</label>
                  <textarea
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full rounded-xl border border-amber-500/30 bg-slate-950 p-2.5 text-xs text-white"
                  />
                </div>

                <div className="flex gap-3 pt-3 border-t border-amber-500/15">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setEditingRoom(null)}
                    className="w-1/2 border-amber-500/30 text-amber-300"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="w-1/2 font-black bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400"
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        )}

        {/* MODAL 3: Delete Confirmation Modal */}
        {deletingRoomId && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <Card className="border-rose-500/40 shadow-2xl p-6 space-y-4 max-w-sm w-full bg-[#0c0c10] text-center">
              <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/30">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-white">Delete Room from Inventory?</h3>
              <p className="text-xs text-slate-400">
                Are you sure you want to remove this room? It will also be removed from the public booking options.
              </p>
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setDeletingRoomId(null)}
                  className="w-1/2 text-xs border-slate-700 text-slate-300"
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(deletingRoomId)}
                  className="w-1/2 text-xs font-bold"
                >
                  Confirm Delete
                </Button>
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
