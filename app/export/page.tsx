"use client";

import { useState } from "react";
import { useApplicationStore } from "@/lib/useApplicationStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Download,
  Table,
  Code,
  BarChart3,
  FileSpreadsheet,
} from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SpreadsheetExporter } from "@/lib/spreadsheet-export";
import { DataExporter, type ExportData } from "@/lib/export-utils";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";

type ExportFormat = "csv" | "json" | "xlsx" | "analytics";

interface JobApplication {
  id: string;
  company: string;
  role: string;
  status: string;
  email: string;
  date: Date | string;
  subject: string;
}

interface SelectedFields {
  company: boolean;
  role: boolean;
  status: boolean;
  email: boolean;
  date: boolean;
  subject: boolean;
}

export default function ExportPage() {
  const applications = useApplicationStore((state) => state.applications);
  const [fileName, setFileName] = useState("job-applications");
  const [exportFormat, setExportFormat] = useState<ExportFormat>("xlsx");
  const [selectedFields, setSelectedFields] = useState<SelectedFields>({
    company: true,
    role: true,
    status: true,
    email: true,
    date: true,
    subject: false,
  });
  const [isExporting, setIsExporting] = useState(false);

  const getFilteredApplications = (): JobApplication[] => {
    return applications;
  };

  const exportToCSV = async (data: JobApplication[]): Promise<void> => {
    try {
      const exportData: ExportData[] = data.map((app: JobApplication) => ({
        company: selectedFields.company ? app.company : "",
        role: selectedFields.role ? app.role : "",
        status: selectedFields.status ? app.status : "",
        email: selectedFields.email ? app.email : "",
        date: selectedFields.date
          ? format(new Date(app.date), "yyyy-MM-dd")
          : "",
        subject: selectedFields.subject ? app.subject : "",
        appliedDate: selectedFields.date
          ? format(new Date(app.date), "yyyy-MM-dd")
          : "",
        lastUpdate: format(new Date(), "yyyy-MM-dd"),
      }));

      const csvContent = DataExporter.convertToCSV(exportData);
      const filename = `${fileName}-${format(new Date(), "yyyy-MM-dd")}.csv`;
      DataExporter.downloadCSV(csvContent, filename);

      toast({
        title: "CSV Downloaded!",
        description: `Downloaded ${exportData.length} applications as CSV file`,
      });
    } catch (error) {
      console.error("CSV export failed:", error);
      toast({
        title: "Export Failed",
        description: "Failed to export data as CSV",
        variant: "destructive",
      });
    }
  };

  const exportToJSON = (data: JobApplication[]): void => {
    try {
      const filteredData = data.map((app) => {
        const filtered: Record<string, string | Date> = {};
        Object.keys(selectedFields).forEach((field) => {
          const fieldKey = field as keyof SelectedFields;
          if (selectedFields[fieldKey]) {
            const appValue = app[fieldKey as keyof JobApplication];
            if (fieldKey === "date" && appValue) {
              filtered[fieldKey] = format(
                new Date(appValue as string | Date),
                "yyyy-MM-dd"
              );
            } else {
              filtered[fieldKey] = appValue as string | Date;
            }
          }
        });
        return filtered;
      });

      const jsonContent = JSON.stringify(filteredData, null, 2);
      const blob = new Blob([jsonContent], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${fileName}-${format(new Date(), "yyyy-MM-dd")}.json`;
      link.click();
      URL.revokeObjectURL(url);

      toast({
        title: "JSON Downloaded!",
        description: `Downloaded ${filteredData.length} applications as JSON file`,
      });
    } catch (error) {
      console.error("JSON export failed:", error);
      toast({
        title: "Export Failed",
        description: "Failed to export data as JSON",
        variant: "destructive",
      });
    }
  };

  const exportToSpreadsheet = async (data: JobApplication[]): Promise<void> => {
    try {
      const filename = `${fileName}-${format(new Date(), "yyyy-MM-dd")}.xlsx`;
      await SpreadsheetExporter.downloadTrueExcelFile(data, filename);

      toast({
        title: "Spreadsheet Downloaded!",
        description: `Downloaded ${data.length} applications as Excel file`,
      });
    } catch (error) {
      console.error("Spreadsheet export failed:", error);
      toast({
        title: "Export Failed",
        description: "Failed to download spreadsheet file",
        variant: "destructive",
      });
    }
  };

  const exportToAnalytics = async (data: JobApplication[]): Promise<void> => {
    try {
      const filename = `${fileName}-analytics-${format(
        new Date(),
        "yyyy-MM-dd"
      )}.xlsx`;
      SpreadsheetExporter.downloadAnalyticsSpreadsheet(data, filename);

      toast({
        title: "Analytics Spreadsheet Downloaded!",
        description: `Downloaded comprehensive analytics with ${data.length} applications`,
      });
    } catch (error) {
      console.error("Analytics export failed:", error);
      toast({
        title: "Export Failed",
        description: "Failed to download analytics spreadsheet",
        variant: "destructive",
      });
    }
  };

  const handleExport = async (): Promise<void> => {
    setIsExporting(true);
    const filteredData = getFilteredApplications();

    try {
      switch (exportFormat) {
        case "csv":
          await exportToCSV(filteredData);
          break;
        case "json":
          exportToJSON(filteredData);
          break;
        case "xlsx":
          await exportToSpreadsheet(filteredData);
          break;
        case "analytics":
          await exportToAnalytics(filteredData);
          break;
      }
    } catch (error) {
      console.error("Export failed:", error);
      toast({
        title: "Export Failed",
        description: "An error occurred during export",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleFieldChange = (field: keyof SelectedFields): void => {
    setSelectedFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const filteredCount = getFilteredApplications().length;

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between p-4 border-b w-screen md:w-full">
        <div className="flex items-center space-x-4">
          <SidebarTrigger />
          <h1 className="text-xl font-semibold">Export Data</h1>
        </div>
      </div>

      <div className="container mx-auto p-4 md:p-6 space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">
                  File Settings
                </CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Configure your export file preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fileName">File Name</Label>
                  <Input
                    id="fileName"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    placeholder="Enter file name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="format">Export Format</Label>
                  <Select
                    value={exportFormat}
                    onValueChange={(value: ExportFormat) =>
                      setExportFormat(value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xlsx">
                        <div className="flex items-center space-x-2">
                          <FileSpreadsheet className="w-4 h-4" />
                          <span>Excel Spreadsheet (.xlsx)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="analytics">
                        <div className="flex items-center space-x-2">
                          <BarChart3 className="w-4 h-4" />
                          <span>Analytics Spreadsheet</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="csv">
                        <div className="flex items-center space-x-2">
                          <Table className="w-4 h-4" />
                          <span>CSV (Excel compatible)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="json">
                        <div className="flex items-center space-x-2">
                          <Code className="w-4 h-4" />
                          <span>JSON (Developer friendly)</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">
                  Select Fields
                </CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Choose which data fields to include in your export
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(selectedFields).map(([field, checked]) => (
                    <div key={field} className="flex items-center space-x-2">
                      <Checkbox
                        id={field}
                        checked={checked}
                        onCheckedChange={() =>
                          handleFieldChange(field as keyof SelectedFields)
                        }
                      />
                      <Label
                        htmlFor={field}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">
                Export Preview
              </CardTitle>
              <CardDescription className="text-sm md:text-base">
                Summary of your export settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Records:</span>
                  <span className="font-medium">{applications.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Filtered Records:
                  </span>
                  <span className="font-medium">{filteredCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Selected Fields:
                  </span>
                  <span className="font-medium">
                    {Object.values(selectedFields).filter(Boolean).length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Format:</span>
                  <span className="font-medium uppercase">{exportFormat}</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button
                  onClick={handleExport}
                  disabled={isExporting || filteredCount === 0}
                  className="w-full"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {isExporting
                    ? "Exporting..."
                    : `Export ${filteredCount} Records`}
                </Button>
              </div>

              {filteredCount === 0 && (
                <p className="text-sm text-muted-foreground text-center">
                  No records available for export.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Export Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">Excel Spreadsheet</h4>
                <p className="text-muted-foreground">
                  Full-featured Excel file with proper formatting and data
                  types.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Analytics Spreadsheet</h4>
                <p className="text-muted-foreground">
                  Includes summary statistics, charts, and detailed application
                  data.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">CSV Format</h4>
                <p className="text-muted-foreground">
                  Simple format compatible with Excel, Google Sheets, and
                  analysis tools.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">JSON Format</h4>
                <p className="text-muted-foreground">
                  Developer-friendly format for data migration and API
                  integration.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
