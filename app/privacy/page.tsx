"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Shield,
  Eye,
  Database,
  Key,
  Users,
  FileText,
  Mail,
  AlertCircle,
  Server,
  Globe,
  Trash2,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
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
              <Shield className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground px-2">
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            We&rsquo;re committed to protecting your privacy and being
            transparent about how we handle your data
          </p>
        </div>

        <Card className="mb-6 sm:mb-8">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              <CardTitle className="text-base sm:text-lg">
                Key Information
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

        <Tabs defaultValue="introduction" className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 h-auto p-1">
            <TabsTrigger
              value="introduction"
              className="flex flex-col sm:flex-row items-center gap-1 py-2 px-1 sm:px-2 text-xs"
            >
              <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-[10px] sm:text-xs lg:text-sm">Intro</span>
            </TabsTrigger>
            <TabsTrigger
              value="collection"
              className="flex flex-col sm:flex-row items-center gap-1 py-2 px-1 sm:px-2 text-xs"
            >
              <Database className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-[10px] sm:text-xs lg:text-sm">Data</span>
            </TabsTrigger>
            <TabsTrigger
              value="usage"
              className="flex flex-col sm:flex-row items-center gap-1 py-2 px-1 sm:px-2 text-xs"
            >
              <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-[10px] sm:text-xs lg:text-sm">Usage</span>
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="flex flex-col sm:flex-row items-center gap-1 py-2 px-1 sm:px-2 text-xs"
            >
              <Key className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-[10px] sm:text-xs lg:text-sm">
                Security
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="third-party"
              className="flex flex-col sm:flex-row items-center gap-1 py-2 px-1 sm:px-2 text-xs"
            >
              <Users className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-[10px] sm:text-xs lg:text-sm">
                3rd Party
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="rights"
              className="flex flex-col sm:flex-row items-center gap-1 py-2 px-1 sm:px-2 text-xs"
            >
              <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-[10px] sm:text-xs lg:text-sm">Rights</span>
            </TabsTrigger>
            <TabsTrigger
              value="deletion"
              className="flex flex-col sm:flex-row items-center gap-1 py-2 px-1 sm:px-2 text-xs"
            >
              <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
              <span className="text-[10px] sm:text-xs lg:text-sm">Delete</span>
            </TabsTrigger>
            <TabsTrigger
              value="contact"
              className="flex flex-col sm:flex-row items-center gap-1 py-2 px-1 sm:px-2 text-xs"
            >
              <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-[10px] sm:text-xs lg:text-sm">Contact</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="introduction" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                  Introduction
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  CareerSync is a free, open-source job application tracking
                  service that helps you organize and analyze your job search by
                  processing your Gmail messages. This Privacy Policy explains
                  how we collect, use, protect, and handle your information when
                  you use our service.
                </p>
                <div className="border rounded-lg p-3 sm:p-4 bg-muted/20">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium mb-1 text-sm sm:text-base">
                        Key Principle
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        We collect and store only the minimum data necessary to
                        provide our service, and you maintain control over your
                        data at all times.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="collection" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Database className="w-4 h-4 sm:w-5 sm:h-5" />
                  What Information We Collect
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  We collect minimal data and process emails temporarily without
                  storage.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-3 sm:p-4 bg-muted/30">
                    <h4 className="font-semibold mb-2 flex items-center gap-2 text-sm sm:text-base">
                      <Server className="w-3 h-3 sm:w-4 sm:h-4" />
                      Stored on Our Servers
                    </h4>
                    <Badge variant="secondary" className="mb-2 sm:mb-3 text-xs">
                      Supabase Database
                    </Badge>
                    <ul className="text-xs sm:text-sm space-y-1 text-muted-foreground">
                      <li>• Your email address</li>
                      <li>• Encrypted Gmail refresh tokens</li>
                      <li>• Email exclusion preferences</li>
                      <li>• Account creation/update dates</li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-3 sm:p-4 bg-muted/30">
                    <h4 className="font-semibold mb-2 flex items-center gap-2 text-sm sm:text-base">
                      <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                      Processed (Not Stored)
                    </h4>
                    <Badge variant="secondary" className="mb-2 sm:mb-3 text-xs">
                      Real-time Only
                    </Badge>
                    <ul className="text-xs sm:text-sm space-y-1 text-muted-foreground">
                      <li>• Gmail message content</li>
                      <li>• Email metadata (subject, sender, date)</li>
                      <li>• AI classification results</li>
                      <li>• Extracted job application data</li>
                    </ul>
                  </div>
                </div>

                <div className="border rounded-lg p-3 sm:p-4 bg-muted/30">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1 text-sm sm:text-base">
                        What We Never Store
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        We <strong>never store</strong> your email content, full
                        messages, or extracted job application details on our
                        servers. All processing is done in real-time and data is
                        immediately discarded after sending results to your
                        browser.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="usage" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  How We Process Your Information
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Real-time email processing with AI classification - no
                  permanent storage of email content.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-3 sm:p-4 bg-muted/30">
                  <h4 className="font-semibold mb-3 text-sm sm:text-base">
                    Our Processing Pipeline:
                  </h4>
                  <div className="space-y-2 sm:space-y-3">
                    {[
                      "Access Gmail messages within your date range",
                      "Filter emails using your exclusion preferences",
                      "Send email text to our HuggingFace AI for classification",
                      "Extract job details (company, role, status, date)",
                      "Send results to your browser and delete server-side data",
                    ].map((action, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 sm:gap-3"
                      >
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <span className="text-xs sm:text-sm leading-relaxed">
                          {action}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="third-party" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                  Third-Party Integrations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-3 sm:p-4 bg-muted/30">
                    <h4 className="font-semibold mb-2 flex items-center gap-2 text-sm sm:text-base">
                      <Globe className="w-3 h-3 sm:w-4 sm:h-4" />
                      Google Gmail API
                    </h4>
                    <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
                      <p>• Secure OAuth 2.0 authentication</p>
                      <p>• Read-only access to your emails</p>
                      <p>• Subject to Google&rsquo;s Privacy Policy</p>
                      <p>• Revocable anytime through Google settings</p>
                    </div>
                  </div>

                  <div className="border rounded-lg p-3 sm:p-4 bg-muted/30">
                    <h4 className="font-semibold mb-2 flex items-center gap-2 text-sm sm:text-base">
                      <Database className="w-3 h-3 sm:w-4 sm:h-4" />
                      HuggingFace Spaces
                    </h4>
                    <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
                      <p>• AI email classification</p>
                      <p>• Our custom model - no data logging</p>
                      <p>• Real-time processing only</p>
                      <p>• No email content retention</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Key className="w-4 h-4 sm:w-5 sm:h-5" />
                  Data Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-3 sm:p-4 bg-muted/30">
                  <h4 className="font-semibold mb-2 flex items-center gap-2 text-sm sm:text-base">
                    <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                    Security Measures
                  </h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                    <div>
                      <strong className="text-foreground">Encryption:</strong>
                      <ul className="mt-1 space-y-1">
                        <li>• Gmail refresh tokens encrypted at rest</li>
                        <li>• HTTPS for all data transmission</li>
                        <li>• Secure OAuth 2.0 authentication</li>
                      </ul>
                    </div>
                    <div>
                      <strong className="text-foreground">
                        Data Protection:
                      </strong>
                      <ul className="mt-1 space-y-1">
                        <li>• Minimal data collection principle</li>
                        <li>• No email content retention</li>
                        <li>• Enterprise-grade database security</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rights" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                  Your Rights and Control
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-3 sm:p-4 bg-muted/30">
                  <h4 className="font-semibold mb-3 text-sm sm:text-base">
                    You have full control over your data:
                  </h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                    {[
                      {
                        title: "Revoke Gmail Access",
                        desc: "Disconnect through Google Account settings - stops all data processing",
                      },
                      {
                        title: "Export Your Data",
                        desc: "Download your job application data anytime from your browser",
                      },
                      {
                        title: "Delete Account Data",
                        desc: "Email us to remove your account and settings from our database",
                      },
                      {
                        title: "Update Preferences",
                        desc: "Modify email exclusion settings and processing preferences",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 sm:gap-3"
                      >
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold">{index + 1}</span>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm sm:text-base">
                            {item.title}
                          </h5>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deletion" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                  Data Deletion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border border-red-200 rounded-lg p-3 sm:p-4 bg-red-50/50 dark:bg-red-950/20 dark:border-red-900">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-red-900 dark:text-red-200 mb-2 text-sm sm:text-base">
                        Complete Account Deletion
                      </h4>
                      <p className="text-xs sm:text-sm text-red-800 dark:text-red-300 mb-3">
                        Email us at{" "}
                        <a
                          href="mailto:jobstatustracker@gmail.com?subject=Account%20Deletion%20Request"
                          className="font-medium underline hover:no-underline break-all"
                        >
                          jobstatustracker@gmail.com
                        </a>{" "}
                        with the subject &ldquo;Account Deletion Request&rdquo;
                        from your CareerSync account email address.
                      </p>
                      <div className="text-xs sm:text-sm text-red-800 dark:text-red-300">
                        <strong>What gets deleted:</strong>
                        <ul className="ml-3 sm:ml-4 mt-1 space-y-1">
                          <li>• Your email address from our database</li>
                          <li>• Encrypted refresh tokens</li>
                          <li>• All preferences and settings</li>
                          <li>• Gmail access automatically revoked</li>
                        </ul>
                      </div>
                    </div>
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
                  Contact & Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 text-sm sm:text-base">
                    Get in Touch
                  </h4>
                  <div className="space-y-1 text-xs sm:text-sm text-muted-foreground">
                    <p>
                      📧 Email:{" "}
                      <a
                        href="mailto:jobstatustracker@gmail.com"
                        className="text-foreground hover:underline break-all"
                      >
                        jobstatustracker@gmail.com
                      </a>
                    </p>

                    <p>
                      🔗 GitHub:{" "}
                      <a
                        href="https://github.com/Tomiwajin/Gmail-Job-Tracking-tool"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground hover:underline break-words"
                      >
                        Open source repository available
                      </a>
                    </p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-2 text-sm sm:text-base">
                    Compliance Standards
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {["CCPA", "Google API Policy", "SOC 2"].map((standard) => (
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
            <div className="text-center space-y-2 sm:space-y-3">
              <p className="text-xs sm:text-sm text-muted-foreground">
                Questions about this policy? We&rsquo;re here to help.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
                <Link href="/">
                  <Button
                    variant="ghost"
                    className="w-full sm:w-auto text-xs sm:text-sm"
                  >
                    Home
                  </Button>
                </Link>
                <Link href="/terms">
                  <Button
                    variant="ghost"
                    className="w-full sm:w-auto text-xs sm:text-sm"
                  >
                    Terms of Service
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
