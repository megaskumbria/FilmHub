"use client";

import { useState } from "react";
import { Lock, Eye, EyeOff, Shield, AlertTriangle } from "lucide-react";
import { Button, Input, Label, Separator, Switch } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { useAuthStore } from "@/features/auth";

function SectionHeader({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex items-start gap-3 mb-5">
      <div className="size-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 mt-0.5">
        <span className="text-accent">{icon}</span>
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        {description && <p className="text-sm text-zinc-muted mt-0.5">{description}</p>}
      </div>
    </div>
  );
}

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <Label className="w-28 shrink-0 text-sm text-zinc-muted text-right">{label}</Label>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const AccountSettings = () => {
  const storedEmail = useAuthStore((state) => state.user.email) ?? "";
  const [email, setEmail] = useState(storedEmail);
  const [prevStoredEmail, setPrevStoredEmail] = useState(storedEmail);

  if (storedEmail !== prevStoredEmail) {
    setPrevStoredEmail(storedEmail);
    setEmail(storedEmail);
  }

  const trimmedEmail = email.trim();
  const emailInvalid = trimmedEmail.length > 0 && !isValidEmail(trimmedEmail);
  const emailUnchanged = trimmedEmail === storedEmail;

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showCurrentPwd, setShowCurrentPwd] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [showRepeatPwd, setShowRepeatPwd] = useState(false);

  const [privateProfile, setPrivateProfile] = useState(false);
  const [publicStats, setPublicStats] = useState(true);

  const passwordMismatch = repeatPassword.length > 0 && newPassword !== repeatPassword;

  return (
    <div className="h-full overflow-y-auto drawer-scroll">
      <div className="p-7 flex flex-col gap-8">
        <section>
          <SectionHeader
            icon={<Lock className="size-4" />}
            title="Security"
            description="Email and password used to sign in"
          />
          <div className="flex flex-col gap-8">
            <FieldRow label="Email">
              <div>
                <div className="flex gap-2">
                  <Input
                    variant="neutral"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className={cn(
                      "h-9 text-sm",
                      emailInvalid && "border-destructive/60 focus-visible:border-destructive/80",
                    )}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={emailUnchanged || emailInvalid || trimmedEmail.length === 0}
                    className="shrink-0 rounded-lg border-border text-sm text-foreground hover:border-accent/40 hover:bg-accent/5 transition-colors px-4 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <span>Save</span>
                  </Button>
                </div>
                {emailInvalid && (
                  <p className="text-sm text-destructive mt-1.5">Enter a valid email</p>
                )}
              </div>
            </FieldRow>

            <Separator />

            <div className="flex flex-col gap-4">
              <FieldRow label="Current">
                <div className="relative">
                  <Input
                    variant="neutral"
                    type={showCurrentPwd ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Current password"
                    className="h-9 text-sm pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPwd((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-muted hover:text-foreground transition-colors"
                  >
                    {showCurrentPwd ?
                      <EyeOff className="size-4" />
                    : <Eye className="size-4" />}
                  </button>
                </div>
              </FieldRow>

              <FieldRow label="New">
                <div className="relative">
                  <Input
                    variant="neutral"
                    type={showNewPwd ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New password"
                    className="h-9 text-sm pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPwd((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-muted hover:text-foreground transition-colors"
                  >
                    {showNewPwd ?
                      <EyeOff className="size-4" />
                    : <Eye className="size-4" />}
                  </button>
                </div>
              </FieldRow>

              <FieldRow label="Confirm">
                <div className="relative">
                  <Input
                    variant="neutral"
                    type={showRepeatPwd ? "text" : "password"}
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    placeholder="Confirm password"
                    className={cn(
                      "h-9 text-sm pr-10",
                      passwordMismatch
                        && "border-destructive/60 focus-visible:border-destructive/80",
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowRepeatPwd((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-muted hover:text-foreground transition-colors"
                  >
                    {showRepeatPwd ?
                      <EyeOff className="size-4" />
                    : <Eye className="size-4" />}
                  </button>
                </div>
                {passwordMismatch && (
                  <p className="text-sm text-destructive mt-1.5">Passwords do not match</p>
                )}
              </FieldRow>

              <div className="flex justify-end mt-1">
                <Button
                  variant="accent"
                  size="sm"
                  disabled={!currentPassword || !newPassword || !repeatPassword || passwordMismatch}
                  className="rounded-lg text-sm px-5 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <span>Update password</span>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Privacy */}
        <section>
          <SectionHeader icon={<Shield className="size-4" />} title="Privacy" />
          <div className="flex flex-col gap-0 rounded-xl border border-border overflow-hidden">
            <div className="flex items-center justify-between gap-4 px-4 py-3.5">
              <div>
                <p className="text-sm font-medium text-foreground">Private profile</p>
                <p className="text-sm text-zinc-muted mt-0.5">
                  Followers require approval; collections stay hidden from strangers
                </p>
              </div>
              <Switch
                checked={privateProfile}
                onCheckedChange={setPrivateProfile}
                className="shrink-0"
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between gap-4 px-4 py-3.5">
              <div>
                <p className="text-sm font-medium text-foreground">Public statistics</p>
                <p className="text-sm text-zinc-muted mt-0.5">
                  Other users can see your viewing stats
                </p>
              </div>
              <Switch checked={publicStats} onCheckedChange={setPublicStats} className="shrink-0" />
            </div>
          </div>
        </section>

        <Separator />

        {/* Danger zone */}
        <section>
          <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 flex items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="size-4 text-destructive shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-foreground">Delete account</p>
                <p className="text-sm text-zinc-muted mt-0.5">This action cannot be undone</p>
              </div>
            </div>
            <Button
              size="sm"
              className="shrink-0 rounded-lg border border-destructive/40 text-destructive hover:bg-destructive/10 hover:border-destructive/60 transition-colors px-4 text-sm"
            >
              <span>Delete</span>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};
