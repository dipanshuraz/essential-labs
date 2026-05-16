import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function AdminRolePage() {
  return (
    <div className="grid gap-6 lg:grid-cols-2 max-w-[1200px]">
      <div className="space-y-6">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-ink">Profile</h2>
            <span className="text-ink-subtle text-sm">✎ Share</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <img
              src="https://i.pravatar.cc/120?img=52"
              alt=""
              className="size-24 rounded-full object-cover"
            />
            <p className="font-bold text-lg text-ink mt-3">Wade Warren</p>
            <p className="text-sm text-ink-muted flex items-center gap-1">
              wade.warren@example.com <span className="cursor-pointer">📋</span>
            </p>
            <p className="text-xs text-ink-muted mt-4 mb-2">Social</p>
            <div className="flex gap-2">
              <Button variant="secondary" className="!text-xs">
                + Social media
              </Button>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-ink">Change Password</h2>
            <button type="button" className="text-xs text-status-info font-medium">
              Need help?
            </button>
          </div>
          <label className="block text-sm mb-3">
            <span className="text-xs text-ink-muted">Current Password</span>
            <input type="password" className="form-field !mt-0" />
          </label>
          <p className="text-xs text-ink-subtle mb-3">
            Forgot? <button type="button" className="text-brand font-medium">Click here</button>
          </p>
          <label className="block text-sm mb-3">
            <span className="text-xs text-ink-muted">New Password</span>
            <input type="password" className="form-field !mt-0" />
          </label>
          <label className="block text-sm mb-4">
            <span className="text-xs text-ink-muted">Re-enter Password</span>
            <input type="password" className="form-field !mt-0" />
          </label>
          <Button variant="primary" className="w-full">
            Save Change
          </Button>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-ink">Profile Update</h2>
          <Button variant="secondary" className="!text-xs">
            Edit
          </Button>
        </div>
        <div className="flex items-center gap-4 mb-6">
          <img src="https://i.pravatar.cc/80?img=52" alt="" className="size-16 rounded-full" />
          <div className="flex gap-2">
            <Button variant="primary" className="!text-xs">
              Upload New
            </Button>
            <Button variant="secondary" className="!text-xs">
              Delete
            </Button>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {["First Name", "Last Name", "Phone", "E-mail"].map((label) => (
            <label key={label} className="text-sm sm:col-span-1">
              <span className="text-xs text-ink-muted">{label}</span>
              <input className="form-field !mt-0" />
            </label>
          ))}
        </div>
        <label className="block text-sm mt-3">
          <span className="text-xs text-ink-muted">Location</span>
          <input className="form-field !mt-0" />
        </label>
        <label className="block text-sm mt-3">
          <span className="text-xs text-ink-muted">Biography</span>
          <textarea
            rows={4}
            placeholder="Enter a biography about you."
            className="form-field !mt-0"
          />
        </label>
        <Button variant="primary" className="mt-4 w-full sm:w-auto">
          Save profile
        </Button>
      </Card>
    </div>
  );
}
