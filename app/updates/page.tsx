"use client";

import { useApplicationStore } from "@/lib/useApplicationStore";
import { useExcludedEmails } from "@/hooks/useExcludedEmails";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CalendarIcon, Search, RefreshCw, Mail, ArrowUp } from "lucide-react";
import { format, subDays, subMonths } from "date-fns";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  ModelStatusBanner,
  useModelStatus,
} from "@/components/ModelStatusBanner";

interface JobApplication {
  id: string;
  company: string;
  role: string;
  status:
    | "applied"
    | "rejected"
    | "interview"
    | "next-phase"
    | "offer"
    | "withdrawn";
  email: string;
  date: Date;
  subject: string;
}

interface ProcessedApplication {
  id: string;
  company: string;
  role: string;
  status: string;
  email: string;
  date: string;
  subject: string;
}

interface DatePreset {
  label: string;
  getValue: () => {
    start: Date;
    end: Date;
  };
}

interface ProcessingProgress {
  stage: string;
  current: number;
  total: number;
  percentage: number;
}

const statusColors = {
  applied: "bg-blue-100 text-blue-800",
  rejected: "bg-red-100 text-red-800",
  interview: "bg-yellow-100 text-yellow-800",
  "next-phase": "bg-purple-100 text-purple-800",
  offer: "bg-green-100 text-green-800",
  withdrawn: "bg-gray-100 text-gray-800",
};

const datePresets: DatePreset[] = [
  {
    label: "Last 7 days",
    getValue: () => ({
      start: subDays(new Date(), 6),
      end: new Date(),
    }),
  },
  {
    label: "Last 30 days",
    getValue: () => ({
      start: subDays(new Date(), 29),
      end: new Date(),
    }),
  },
  {
    label: "Last 3 months",
    getValue: () => ({
      start: subMonths(new Date(), 3),
      end: new Date(),
    }),
  },
  {
    label: "Last 6 months",
    getValue: () => ({
      start: subMonths(new Date(), 6),
      end: new Date(),
    }),
  },
];

export default function HomePage() {
  // Application store
  const updates = useApplicationStore((state) => state.applications);
  const addApplications = useApplicationStore((state) => state.addApplications);
  const startDate = useApplicationStore((state) => state.startDate);
  const endDate = useApplicationStore((state) => state.endDate);
  const setStartDate = useApplicationStore((state) => state.setStartDate);
  const setEndDate = useApplicationStore((state) => state.setEndDate);

  // Auth store
  const isGmailConnected = useApplicationStore(
    (state) => state.isGmailConnected
  );
  const checkAuthStatus = useApplicationStore((state) => state.checkAuthStatus);

  const { excludedEmails } = useExcludedEmails();

  const [filteredApplications, setFilteredApplications] = useState<
    JobApplication[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isProcessing, setIsProcessing] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [processingProgress, setProcessingProgress] =
    useState<ProcessingProgress | null>(null);

  // Model warmup status
  const { isModelReady, modelStatus, handleStatusChange } = useModelStatus();

  const handlePresetClick = (preset: DatePreset) => {
    const { start, end } = preset.getValue();
    setStartDate(start);
    setEndDate(end);
    setFormError(null);
    setSelectedPreset(preset.label);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    let filtered = updates;

    if (searchTerm) {
      filtered = filtered.filter(
        (app) =>
          app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((app) => app.status === statusFilter);
    }

    if (startDate) {
      filtered = filtered.filter((app) => app.date >= startDate);
    }

    if (endDate) {
      filtered = filtered.filter((app) => app.date <= endDate);
    }

    setFilteredApplications(filtered);
  }, [updates, searchTerm, statusFilter, startDate, endDate]);

  useEffect(() => {
    const matchingPreset = datePresets.find((preset) => {
      const { start, end } = preset.getValue();
      return (
        startDate &&
        endDate &&
        startDate.toDateString() === start.toDateString() &&
        endDate.toDateString() === end.toDateString()
      );
    });

    if (!matchingPreset) {
      setSelectedPreset(null);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check auth status on mount
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const handleProcessEmails = async () => {
    if (!startDate || !endDate) {
      setFormError("Please select a valid start and end date.");
      return;
    }

    setFormError(null);

    if (!isGmailConnected) {
      return;
    }

    setIsProcessing(true);
    setProcessingProgress({
      stage: "Starting...",
      current: 0,
      total: 100,
      percentage: 0,
    });

    try {
      const response = await fetch("/api/process-emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startDate,
          endDate,
          excludedEmails,
        }),
      });

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.substring(6));

              if (data.type === "progress") {
                setProcessingProgress({
                  stage: data.stage,
                  current: data.current,
                  total: data.total,
                  percentage: Math.round((data.current / data.total) * 100),
                });
              } else if (data.type === "complete") {
                const newAppsWithDateObjects = data.applications.map(
                  (app: ProcessedApplication) => ({
                    ...app,
                    date: new Date(app.date),
                  })
                );

                addApplications(newAppsWithDateObjects);

                if (data.excludedCount > 0) {
                  console.log(
                    `Processed ${data.processed} applications, excluded ${data.excludedCount} emails`
                  );
                }

                setProcessingProgress({
                  stage: "Complete!",
                  current: 100,
                  total: 100,
                  percentage: 100,
                });

                setTimeout(() => {
                  setProcessingProgress(null);
                }, 2000);
              } else if (data.type === "error") {
                throw new Error(data.message);
              }
            } catch (parseError) {
              console.error("Error parsing progress data:", parseError);
            }
          }
        }
      }
    } catch (error) {
      console.error("Failed to process emails:", error);
      setProcessingProgress(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGmailLogin = async () => {
    try {
      const response = await fetch("/api/auth/gmail");
      const { authUrl } = await response.json();
      window.location.href = authUrl;
    } catch (error) {
      console.error("Failed to initiate Gmail login:", error);
    }
  };

  const getProcessingButtonText = () => {
    if (!isProcessing) {
      if (modelStatus === "waking") return "Models Loading...";
      if (modelStatus === "error") return "Process Emails";
      return "Process Emails";
    }

    if (processingProgress) {
      return `${processingProgress.stage} ${processingProgress.percentage}%`;
    }

    return "Processing...";
  };

  const isButtonDisabled = isProcessing || modelStatus === "waking";

  return (
    <div className="flex flex-col min-h-screen">
      {/* Model warmup banner - only shows when Gmail is connected */}
      {isGmailConnected && (
        <ModelStatusBanner onStatusChange={handleStatusChange} />
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-b md:w-full w-screen gap-4">
        <div className="flex items-center space-x-4">
          <SidebarTrigger />
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>
        <div className="flex items-center gap-2">
          {isGmailConnected && (
            <Button
              onClick={handleProcessEmails}
              disabled={isButtonDisabled}
              size="sm"
              className="relative w-full sm:w-auto overflow-hidden disabled:opacity-100"
            >
              {isProcessing && processingProgress && (
                <div
                  className="absolute inset-0 bg-blue-600/80 transition-all duration-300 ease-out"
                  style={{ width: `${processingProgress.percentage}%` }}
                />
              )}
              <RefreshCw
                className={`w-4 h-4 mr-2 relative z-10 ${
                  isProcessing || modelStatus === "waking" ? "animate-spin" : ""
                }`}
              />
              <span className="truncate relative z-10">
                {getProcessingButtonText()}
              </span>
            </Button>
          )}
          {!isGmailConnected && (
            <Button
              onClick={handleGmailLogin}
              size="sm"
              className="w-full sm:w-auto"
            >
              <Mail className="w-4 h-4 mr-2" />
              Connect Gmail
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4 border-b">
        <div className="flex flex-wrap gap-2">
          {datePresets.map((preset, index) => (
            <Button
              key={index}
              variant={
                selectedPreset === preset.label ? "secondary" : "outline"
              }
              size="sm"
              className="h-9 px-2 sm:px-4 text-xs sm:text-sm flex-shrink-0"
              onClick={() => handlePresetClick(preset)}
            >
              <CalendarIcon className="w-4 h-4 mr-1" />
              {preset.label}
            </Button>
          ))}
        </div>

        <div className="hidden sm:block w-full h-px bg-border"></div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal bg-transparent"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0" />
                  <span className="truncate">
                    {startDate ? format(startDate, "PPP") : "Pick start date"}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex-1">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal bg-transparent"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0" />
                  <span className="truncate">
                    {endDate ? format(endDate, "PPP") : "Pick end date"}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {formError && (
          <div className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md">
            {formError}
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 p-4 border-b">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search by company, role, or email..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="w-full sm:w-48">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="applied">Applied</SelectItem>
              <SelectItem value="interview">Interview</SelectItem>
              <SelectItem value="next-phase">Next Phase</SelectItem>
              <SelectItem value="offer">Offer</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex-1 p-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">
            Job updates ({filteredApplications.length})
          </h2>
          <p className="text-sm text-muted-foreground">
            Track and manage your job application updates
          </p>
        </div>

        <div className="block lg:hidden space-y-3">
          {filteredApplications.map((app) => (
            <Card key={app.id} className="p-3 shadow-sm">
              <div className="space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-base truncate">
                      {app.company}
                    </h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {app.role}
                    </p>
                  </div>
                  <Badge
                    className={`${
                      statusColors[app.status]
                    } flex-shrink-0 text-xs`}
                  >
                    {app.status.replace("-", " ")}
                  </Badge>
                </div>
                <div className="space-y-1 text-sm">
                  <p
                    className="text-muted-foreground truncate"
                    title={app.email}
                  >
                    {app.email}
                  </p>
                  <p className="font-medium">
                    {format(app.date, "MMM dd, yyyy")}
                  </p>
                  <p
                    className="text-muted-foreground line-clamp-2 leading-relaxed text-xs"
                    title={app.subject}
                  >
                    {app.subject}
                  </p>
                </div>
              </div>
            </Card>
          ))}

          {filteredApplications.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <div className="space-y-3">
                <p className="text-lg">No job updates found</p>
                <p className="text-sm">
                  {!isGmailConnected
                    ? "Connect Gmail to get started!"
                    : "Try adjusting your filters or processing more emails."}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="hidden lg:block rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[150px]">Company</TableHead>
                <TableHead className="min-w-[200px]">Role</TableHead>
                <TableHead className="min-w-[100px]">Status</TableHead>
                <TableHead className="min-w-[180px]">Email</TableHead>
                <TableHead className="min-w-[100px]">Date</TableHead>
                <TableHead className="min-w-[200px]">Subject</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">
                    <div className="truncate max-w-[150px]" title={app.company}>
                      {app.company}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="truncate max-w-[200px]" title={app.role}>
                      {app.role}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[app.status]}>
                      {app.status.replace("-", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    <div className="truncate max-w-[180px]" title={app.email}>
                      {app.email}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">
                    {format(app.date, "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell>
                    <div className="truncate max-w-[200px]" title={app.subject}>
                      {app.subject}
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {filteredApplications.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12">
                    <div className="space-y-3 text-muted-foreground">
                      <p className="text-lg">No job updates found</p>
                      <p className="text-sm">
                        {!isGmailConnected
                          ? "Connect Gmail to get started!"
                          : "Try adjusting your filters or processing more emails."}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 shadow-lg hover:shadow-xl transition-shadow duration-300"
          size="icon"
          aria-label="Back to top"
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
