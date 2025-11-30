"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import type { Locale, Dictionary } from "@/lib/i18n/dictionaries"
import type { Institution, StorageType } from "@/lib/types/database"
import { Loader2 } from "lucide-react"

interface AddSavingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  locale: Locale
  t: Dictionary
  institutions: Institution[]
}

export function AddSavingsDialog({ open, onOpenChange, locale, t, institutions }: AddSavingsDialogProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [amount, setAmount] = useState("")
  const [storageType, setStorageType] = useState<StorageType>("cash")
  const [institutionId, setInstitutionId] = useState<string>("")
  const [description, setDescription] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const supabase = getSupabaseBrowserClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      setLoading(false)
      return
    }

    const { error } = await supabase.from("user_savings").insert({
      user_id: user.id,
      amount: Number.parseFloat(amount),
      storage_type: storageType,
      institution_id: institutionId || null,
      description: description || null,
    })

    if (!error) {
      setAmount("")
      setStorageType("cash")
      setInstitutionId("")
      setDescription("")
      onOpenChange(false)
      router.refresh()
    }

    setLoading(false)
  }

  const storageTypes: { value: StorageType; labelEn: string; labelEs: string }[] = [
    { value: "cash", labelEn: "Cash", labelEs: "Efectivo" },
    { value: "bank_account", labelEn: "Bank Account", labelEs: "Cuenta Bancaria" },
    { value: "cooperative", labelEn: "Cooperative", labelEs: "Cooperativa" },
    { value: "investment", labelEn: "Investment", labelEs: "Inversión" },
    { value: "other", labelEn: "Other", labelEs: "Otro" },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t.savings.addTitle}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">{t.savings.amount}</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>{t.savings.storageType}</Label>
            <Select value={storageType} onValueChange={(value) => setStorageType(value as StorageType)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {storageTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {locale === "es" ? type.labelEs : type.labelEn}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {(storageType === "bank_account" || storageType === "cooperative") && (
            <div className="space-y-2">
              <Label>{t.savings.institution}</Label>
              <Select value={institutionId} onValueChange={setInstitutionId}>
                <SelectTrigger>
                  <SelectValue placeholder={locale === "es" ? "Seleccionar institución" : "Select institution"} />
                </SelectTrigger>
                <SelectContent>
                  {institutions
                    .filter((i) => (storageType === "bank_account" ? i.type === "bank" : i.type === "cooperative"))
                    .map((institution) => (
                      <SelectItem key={institution.id} value={institution.id}>
                        {institution.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label>{t.savings.description}</Label>
            <Textarea
              placeholder={locale === "es" ? "Ej: Ahorros para emergencias" : "E.g., Emergency savings"}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={() => onOpenChange(false)}
            >
              {t.savings.cancel}
            </Button>
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90" disabled={loading || !amount}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : t.savings.save}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
