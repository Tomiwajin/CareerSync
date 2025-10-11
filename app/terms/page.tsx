"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Shield,
  Settings,
  Users,
  AlertTriangle,
  Scale,
  FileText,
  Mail,
  CheckCircle,
  XCircle,
  Clock,
  Globe,
  Database,
} from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen w-screen">
      <div className="flex items-center p-3 sm:p-4 border-b w-full">
        <Link href="/">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 sm:gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-xs sm:text-sm">Return Home</span>
          </Button>
        </Link>
      </div>

      <div className="flex-1 p-3 sm:p-4 lg:p-6 mx-auto w-full max-w-7xl">
        <div className="text-center space-y-3 sm:space-y-4 mb-6 sm:mb-8">
          <div className="flex items-center justify-center">
            <div className="p-2 sm:p-3 rounded-full">
              <Scale className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground px-2">
            Terms of Service
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            Please read these terms carefully before using CareerSync
          </p>
        </div>

        <Card className="mb-6 sm:mb-8">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
              <CardTitle className="text-base sm:text-lg">
                Agreement Information
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
              <div>
                <strong>Effective Date:</strong>
                <br />
                <span className="text-muted-foreground">August 2025</span>
              </div>
              <div>
                <strong>Last Updated:</strong>
                <br />
                <span className="text-muted-foreground">September 2025</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="acceptance" className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-10 h-auto p-1">
            <TabsTrigger
              value="acceptance"
              className="flex flex-col sm:flex-row items-center gap-1 py-2 px-1 sm:px-2 text-xs"
            >
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-[10px] sm:text-xs lg:text-sm">Accept</span>
            </TabsTrigger>
            <TabsTrigger
              value="service"
              className="flex flex-col sm:flex-row items-center gap-1 py-2 px-1 sm:px-2 text-xs"
            >
              <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-[10px] sm:text-xs lg:text-sm">Service</span>
            </TabsTrigger>
            <TabsTrigger
              value="accounts"
              className="flex flex-col sm:flex-row items-center gap-1 py-2 px-1 sm:px-2 text-xs"
            >
              <Users className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-[10px] sm:text-xs lg:text-sm">
                Accounts
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="use"
              className="flex flex-col sm:flex-row items-center gap-1 py-2 px-1 sm:px-2 text-xs"
            >
              <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-[10px] sm:text-xs lg:text-sm">Use</span>
            </TabsTrigger>
            <TabsTrigger
              value="data"
              className="flex flex-col sm:flex-row items-center gap-1 py-2 px-1 sm:px-2 text-xs"
            >
              <Database className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-[10px] sm:text-xs lg:text-sm">Data</span>
            </TabsTrigger>
            <TabsTrigger
              value="disclaimers"
              className="flex flex-col sm:flex-row items-center gap-1 py-2 px-1 sm:px-2 text-xs"
            >
              <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-[10px] sm:text-xs lg:text-sm">
                Disclaimers
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="liability"
              className="flex flex-col sm:flex-row items-center gap-1 py-2 px-1 sm:px-2 text-xs"
            >
              <Scale className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-[10px] sm:text-xs lg:text-sm">
                Liability
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="third-party"
              className="flex flex-col sm:flex-row items-center gap-1 py-2 px-1 sm:px-2 text-xs"
            >
              <Globe className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-[10px] sm:text-xs lg:text-sm">
                3rd Party
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="termination"
              className="flex flex-col sm:flex-row items-center gap-1 py-2 px-1 sm:px-2 text-xs"
            >
              <XCircle className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
              <span className="text-[10px] sm:text-xs lg:text-sm">End</span>
            </TabsTrigger>
            <TabsTrigger
              value="contact"
              className="flex flex-col sm:flex-row items-center gap-1 py-2 px-1 sm:px-2 text-xs"
            >
              <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-[10px] sm:text-xs lg:text-sm">Contact</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="acceptance" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  1. Acceptance of Terms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-3 sm:p-4 bg-muted/20">
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3">
                    By accessing and using CareerSync (&ldquo;the
                    Service&rdquo;), you accept and agree to be bound by these
                    Terms of Service. If you do not agree to these terms, please
                    do not use the Service.
                  </p>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium mb-1 text-sm sm:text-base">
                        Important
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        CareerSync is a free, open-source tool. These terms
                        protect both you and us while ensuring the service
                        remains available to everyone.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="service" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                  2. Description of Service
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-3 sm:p-4 bg-muted/30">
                  <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">
                    CareerSync helps job seekers by:
                  </h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3">
                    {[
                      "Gmail Integration: Connecting securely to your Gmail",
                      "Email Analysis: Processing emails to identify job correspondence",
                      "AI Classification: Using machine learning for email categorization",
                      "Data Extraction: Parsing company names, job titles, dates",
                      "Organization: Providing a dashboard for job search progress",
                      "Export: Allowing download of your job tracking data",
                    ].map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                        <span className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="accounts" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                  3. User Accounts and Authentication
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-3 sm:p-4 bg-muted/30">
                    <h4 className="font-semibold mb-2 text-sm sm:text-base">
                      Account Requirements
                    </h4>
                    <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Valid Gmail account required</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Must be at least 13 years old</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Grant Gmail read permissions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Comply with Google Terms</span>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-3 sm:p-4 bg-muted/30">
                    <h4 className="font-semibold mb-2 text-sm sm:text-base">
                      Your Responsibilities
                    </h4>
                    <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Maintain Google account security</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>
                          Monitor CareerSync&rsquo;s access permissions
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Use service for personal job search only</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="use" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                  4. Acceptable Use Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-3 sm:p-4 bg-muted/30">
                    <h4 className="font-semibold mb-2 flex items-center gap-2 text-sm sm:text-base">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                      You may use CareerSync for:
                    </h4>
                    <ul className="text-xs sm:text-sm text-muted-foreground space-y-1 ml-2">
                      <li>• Tracking your personal job applications</li>
                      <li>• Organizing career search activities</li>
                      <li>• Analyzing your job search progress</li>
                      <li>• Exporting your own data</li>
                      <li>• Personal, non-commercial use</li>
                    </ul>
                  </div>

                  <div className="border border-red-200 rounded-lg p-3 sm:p-4 bg-red-50/50 dark:bg-red-950/20 dark:border-red-900">
                    <h4 className="font-semibold mb-2 flex items-center gap-2 text-sm sm:text-base">
                      <XCircle className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
                      You must NOT:
                    </h4>
                    <ul className="text-xs sm:text-sm text-muted-foreground space-y-1 ml-2">
                      <li>• Violate applicable laws or regulations</li>
                      <li>• Attempt unauthorized access to the Service</li>
                      <li>• Interfere with or disrupt the Service</li>
                      <li>
                        • Use for commercial purposes without authorization
                      </li>
                      <li>• Reverse engineer the application</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Database className="w-4 h-4 sm:w-5 sm:h-5" />
                  5. Data and Privacy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-3 sm:p-4 bg-muted/30">
                    <h4 className="font-semibold mb-2 text-sm sm:text-base">
                      Data Processing
                    </h4>
                    <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
                      <p>• Processed per our Privacy Policy</p>
                      <p>• Real-time email analysis only</p>
                      <p>• No permanent email storage</p>
                      <p>• You retain full data ownership</p>
                    </div>
                  </div>

                  <div className="border rounded-lg p-3 sm:p-4 bg-muted/30">
                    <h4 className="font-semibold mb-2 text-sm sm:text-base">
                      Your Control
                    </h4>
                    <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
                      <p>• Export data anytime</p>
                      <p>• Delete local browser storage</p>
                      <p>• Revoke Gmail access</p>
                      <p>• Request account deletion via email</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="disclaimers" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />
                  6. Important Disclaimers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="border rounded-lg p-3 sm:p-4 bg-muted/30">
                  <h4 className="font-semibold mb-2 text-sm sm:text-base">
                    Service Provided &ldquo;AS IS&rdquo;
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                    We make no warranties regarding:
                  </p>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1 ml-3 sm:ml-4">
                    <li>• Accuracy of extracted job application data</li>
                    <li>• Uninterrupted or error-free operation</li>
                    <li>• Security of data transmission</li>
                    <li>• Compatibility with all email formats</li>
                    <li>• Performance of third-party integrations</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="liability" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Scale className="w-4 h-4 sm:w-5 sm:h-5" />
                  7. Limitation of Liability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-3 sm:p-4 bg-muted/30">
                  <h4 className="font-semibold mb-2 text-sm sm:text-base">
                    Maximum Liability
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, CAREERSYNC SHALL NOT
                    BE LIABLE FOR:
                  </p>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1 ml-3 sm:ml-4">
                    <li>
                      • Indirect, incidental, special, or consequential damages
                    </li>
                    <li>
                      • Loss of data, profits, revenue, or business
                      opportunities
                    </li>
                    <li>• Service interruptions or unavailability</li>
                    <li>• Third-party service actions or failures</li>
                  </ul>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2 sm:mt-3 font-medium">
                    Our total liability shall not exceed $0 (zero dollars), as
                    CareerSync is provided free of charge.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="third-party" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
                  8. Third-Party Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-3 sm:p-4 bg-muted/30">
                    <h4 className="font-semibold mb-2 text-sm sm:text-base">
                      Google Integration
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                      The Service integrates with Google Gmail API and is
                      subject to:
                    </p>
                    <div className="space-y-1 sm:space-y-2">
                      {[
                        "Google's Terms of Service",
                        "Google API Services User Data Policy",
                        "Changes in Google's API may affect functionality",
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            className="text-[10px] sm:text-xs"
                          >
                            {index + 1}
                          </Badge>
                          <span className="text-xs sm:text-sm text-muted-foreground">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border rounded-lg p-3 sm:p-4 bg-muted/30">
                    <h4 className="font-semibold mb-2 text-sm sm:text-base">
                      Other Services
                    </h4>
                    <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Database className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Supabase (database hosting)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>HuggingFace (AI classification)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Vercel (application hosting)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="termination" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                  9. Termination
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-3 sm:p-4 bg-muted/30">
                    <h4 className="font-semibold mb-2 flex items-center gap-2 text-sm sm:text-base">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                      You Can Terminate By:
                    </h4>
                    <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                      <li>
                        • Revoking Gmail access via Google Account settings
                      </li>
                      <li>• Clearing your browser data</li>
                      <li>• Emailing us for account deletion</li>
                      <li>• Simply ceasing to use the Service</li>
                    </ul>
                  </div>

                  <div className="border border-red-200 rounded-lg p-3 sm:p-4 bg-red-50/50 dark:bg-red-950/20 dark:border-red-900">
                    <h4 className="font-semibold mb-2 flex items-center gap-2 text-sm sm:text-base">
                      <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
                      We May Terminate If:
                    </h4>
                    <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                      <li>• Terms of Service are breached</li>
                      <li>• Illegal or harmful activity detected</li>
                      <li>• Technical or business reasons require it</li>
                      <li>• Service discontinuation</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="text-center space-y-2 sm:space-y-3">
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Questions about these Terms of Service? We&rsquo;re here to
                    help.
                  </p>
                  <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
                    <p className="flex items-center justify-center gap-2">
                      <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                      <a
                        href="mailto:jobstatustracker@gmail.com"
                        className="text-foreground hover:underline break-all"
                      >
                        jobstatustracker@gmail.com
                      </a>
                    </p>
                    <p className="flex items-center justify-center gap-2">
                      <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>GitHub: </span>
                      <a
                        href="https://github.com/Tomiwajin/Gmail-Job-Tracking-tool"
                        className="text-foreground hover:underline break-words"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open source repository
                      </a>
                    </p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-2 text-sm sm:text-base">
                    Legal Compliance
                  </h4>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {[
                      "United States Law",
                      "CCPA Compliant",
                      "Google API Policy",
                    ].map((standard) => (
                      <Badge
                        key={standard}
                        variant="secondary"
                        className="text-xs"
                      >
                        {standard}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-6 sm:mt-8 bg-muted">
          <CardContent className="pt-4 sm:pt-6">
            <div className="text-center space-y-3 sm:space-y-4">
              <div className="flex items-center justify-center">
                <div className="p-2 rounded-full">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>
              <h3 className="text-base sm:text-lg font-semibold">
                Free & Open Source
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm max-w-2xl mx-auto px-4">
                This is a free, open-source tool designed to help job seekers
                organize their applications. We are committed to protecting your
                privacy and providing a useful service without any hidden costs
                or data monetization.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 pt-2">
                <Link href="/">
                  <Button
                    variant="ghost"
                    className="w-full sm:w-auto text-xs sm:text-sm"
                  >
                    Home
                  </Button>
                </Link>
                <Link href="/privacy">
                  <Button
                    variant="ghost"
                    className="w-full sm:w-auto text-xs sm:text-sm"
                  >
                    Privacy Policy
                  </Button>
                </Link>
                <a
                  href="https://github.com/Tomiwajin/Gmail-Job-Tracking-tool"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="ghost"
                    className="w-full sm:w-auto text-xs sm:text-sm"
                  >
                    GitHub
                  </Button>
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
