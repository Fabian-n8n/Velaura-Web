import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle, ChevronDown, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { FadeUp } from '@/components/ui/animations';

const ease = [0.22, 1, 0.36, 1];
const PROPERTY_TYPES = ['HDB Flat', 'Condominium', 'Landed Property', 'Commercial / Office'];
const ROOMS = ['Living Room', 'Master Bedroom', 'Bedroom', 'Dining Room', 'Study', 'Kitchen', 'Others'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAY_LABELS = ['Mo','Tu','We','Th','Fr','Sa','Su'];

/* ── useClickOutside ── */
function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (e) => { if (ref.current && !ref.current.contains(e.target)) handler(); };
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [ref, handler]);
}

/* ── Custom Select ── */
function CustomSelect({ options, value, onChange, placeholder, error }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useClickOutside(ref, () => setOpen(false));

  return (
    <div ref={ref} className="relative">
      <motion.button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between rounded-xl px-4 py-3 text-sm text-left outline-none"
        style={{
          background: open ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.04)',
          border: `1px solid ${error ? 'rgba(240,112,48,0.5)' : open ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.08)'}`,
          color: value ? 'white' : 'rgba(255,255,255,0.22)',
          transition: 'border-color 0.2s, background 0.2s',
        }}
        whileTap={{ scale: 0.995 }}
      >
        <span>{value || placeholder}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22, ease }}
          className="flex-shrink-0 ml-2"
        >
          <ChevronDown size={15} className="text-white/35" />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute left-0 right-0 z-50 rounded-xl overflow-hidden mt-2"
            style={{
              background: 'rgba(11,10,26,0.97)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.09)',
              boxShadow: '0 20px 48px rgba(0,0,0,0.65)',
              transformOrigin: 'top',
            }}
            initial={{ opacity: 0, scaleY: 0.92, y: -4 }}
            animate={{ opacity: 1, scaleY: 1, y: 0 }}
            exit={{ opacity: 0, scaleY: 0.94, y: -4 }}
            transition={{ duration: 0.18, ease }}
          >
            {options.map((opt, i) => (
              <motion.button
                key={opt}
                type="button"
                onClick={() => { onChange(opt); setOpen(false); }}
                className="w-full text-left px-4 py-3 text-sm flex items-center justify-between"
                style={{
                  color: value === opt ? 'white' : 'rgba(255,255,255,0.52)',
                  borderBottom: i < options.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  background: 'transparent',
                }}
                whileHover={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.9)' }}
                whileTap={{ background: 'rgba(255,255,255,0.08)' }}
                transition={{ duration: 0.12 }}
              >
                {opt}
                {value === opt && (
                  <CheckCircle size={13} style={{ color: '#F07030', opacity: 0.8 }} />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Custom Date Picker ── */
function CustomDatePicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const today = new Date(); today.setHours(0,0,0,0);
  const [view, setView] = useState(() => {
    const d = value ? new Date(value) : new Date();
    return { year: d.getFullYear(), month: d.getMonth() };
  });
  const ref = useRef(null);
  useClickOutside(ref, () => setOpen(false));

  const { year, month } = view;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const offset = (firstDay + 6) % 7; // Mon-first

  const selected = value ? new Date(value) : null;

  const isPast = (day) => new Date(year, month, day) < today;
  const isSelected = (day) =>
    selected &&
    selected.getFullYear() === year &&
    selected.getMonth() === month &&
    selected.getDate() === day;
  const isToday = (day) =>
    today.getFullYear() === year &&
    today.getMonth() === month &&
    today.getDate() === day;

  const prevMonth = () =>
    setView(v => v.month === 0 ? { year: v.year - 1, month: 11 } : { ...v, month: v.month - 1 });
  const nextMonth = () =>
    setView(v => v.month === 11 ? { year: v.year + 1, month: 0 } : { ...v, month: v.month + 1 });

  const handleDay = (day) => {
    if (isPast(day)) return;
    const d = new Date(year, month, day);
    onChange(d.toISOString().split('T')[0]);
    setOpen(false);
  };

  const displayValue = selected
    ? selected.toLocaleDateString('en-SG', { day: 'numeric', month: 'long', year: 'numeric' })
    : null;

  // Build grid cells: empty + day numbers
  const cells = [
    ...Array(offset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  // Pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div ref={ref} className="relative">
      <motion.button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between rounded-xl px-4 py-3 text-sm text-left outline-none"
        style={{
          background: open ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.04)',
          border: `1px solid ${open ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.08)'}`,
          color: displayValue ? 'white' : 'rgba(255,255,255,0.22)',
          transition: 'border-color 0.2s, background 0.2s',
        }}
        whileTap={{ scale: 0.995 }}
      >
        <span>{displayValue || 'Select a date'}</span>
        <Calendar size={14} className="text-white/35 flex-shrink-0 ml-2" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute left-0 right-0 z-50 mt-2 rounded-xl p-4"
            style={{
              background: 'rgba(11,10,26,0.97)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.09)',
              boxShadow: '0 20px 48px rgba(0,0,0,0.65)',
              transformOrigin: 'top',
            }}
            initial={{ opacity: 0, scaleY: 0.92, y: -4 }}
            animate={{ opacity: 1, scaleY: 1, y: 0 }}
            exit={{ opacity: 0, scaleY: 0.94, y: -4 }}
            transition={{ duration: 0.18, ease }}
          >
            {/* Month navigation */}
            <div className="flex items-center justify-between mb-4">
              <motion.button
                type="button"
                onClick={prevMonth}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white/40 hover:text-white/80"
                style={{ background: 'rgba(255,255,255,0.05)' }}
                whileHover={{ background: 'rgba(255,255,255,0.09)' }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft size={14} />
              </motion.button>
              <span className="text-sm font-medium text-white/80">
                {MONTHS[month]} {year}
              </span>
              <motion.button
                type="button"
                onClick={nextMonth}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white/40 hover:text-white/80"
                style={{ background: 'rgba(255,255,255,0.05)' }}
                whileHover={{ background: 'rgba(255,255,255,0.09)' }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight size={14} />
              </motion.button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 mb-1">
              {DAY_LABELS.map(d => (
                <span key={d} className="text-center text-[10px] text-white/25 py-1 tracking-wide">
                  {d}
                </span>
              ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7 gap-y-0.5">
              {cells.map((day, i) => {
                if (!day) return <div key={`e-${i}`} />;
                const past     = isPast(day);
                const sel      = isSelected(day);
                const tod      = isToday(day) && !sel;

                return (
                  <motion.button
                    key={day}
                    type="button"
                    onClick={() => handleDay(day)}
                    disabled={past}
                    className="relative h-8 w-full flex items-center justify-center rounded-lg text-xs"
                    style={{
                      color: past ? 'rgba(255,255,255,0.15)' : sel ? 'white' : 'rgba(255,255,255,0.65)',
                      background: sel ? '#F07030' : 'transparent',
                      cursor: past ? 'not-allowed' : 'pointer',
                      outline: tod ? '1px solid rgba(255,255,255,0.2)' : 'none',
                    }}
                    whileHover={!past && !sel ? { background: 'rgba(255,255,255,0.08)', color: 'white' } : {}}
                    whileTap={!past ? { scale: 0.88 } : {}}
                    transition={{ duration: 0.1 }}
                  >
                    {day}
                  </motion.button>
                );
              })}
            </div>

            {/* Clear */}
            {value && (
              <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <button
                  type="button"
                  onClick={() => { onChange(''); setOpen(false); }}
                  className="text-xs text-white/30 hover:text-white/55 transition-colors w-full text-center"
                >
                  Clear date
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Shared Field wrapper ── */
function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs tracking-[0.12em] uppercase text-white/38">{label}</label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            className="text-xs"
            style={{ color: '#F07030' }}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Animated text input ── */
function TextInput({ type = 'text', placeholder, value, onChange, error, ...rest }) {
  const [focused, setFocused] = useState(false);
  return (
    <motion.div
      className="relative rounded-xl overflow-hidden"
      animate={{
        boxShadow: focused
          ? '0 0 0 1px rgba(255,255,255,0.2)'
          : error
          ? '0 0 0 1px rgba(240,112,48,0.45)'
          : '0 0 0 1px rgba(255,255,255,0.08)',
      }}
      transition={{ duration: 0.15 }}
    >
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none"
        style={{ background: focused ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.04)', border: 'none', transition: 'background 0.2s' }}
        {...rest}
      />
    </motion.div>
  );
}

function TextArea({ placeholder, value, onChange }) {
  const [focused, setFocused] = useState(false);
  return (
    <motion.div
      className="relative rounded-xl overflow-hidden"
      animate={{ boxShadow: focused ? '0 0 0 1px rgba(255,255,255,0.2)' : '0 0 0 1px rgba(255,255,255,0.08)' }}
      transition={{ duration: 0.15 }}
    >
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={3}
        className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none"
        style={{ background: focused ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.04)', border: 'none', resize: 'none', transition: 'background 0.2s' }}
      />
    </motion.div>
  );
}

/* ── Page ── */
export default function BookConsultation() {
  const [form, setForm]       = useState({ name: '', email: '', phone: '', propertyType: '', rooms: [], date: '', message: '' });
  const [errors, setErrors]   = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (key, val) => {
    setForm(f => ({ ...f, [key]: val }));
    setErrors(e => ({ ...e, [key]: '' }));
  };

  const toggleRoom = (room) => {
    setForm(f => ({
      ...f,
      rooms: f.rooms.includes(room) ? f.rooms.filter(r => r !== room) : [...f.rooms, room],
    }));
    setErrors(e => ({ ...e, rooms: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())       e.name         = 'Please enter your name.';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Please enter a valid email.';
    if (!form.phone.trim())      e.phone        = 'Please enter your contact number.';
    if (!form.propertyType)      e.propertyType = 'Please select a property type.';
    if (!form.rooms.length)      e.rooms        = 'Please select at least one room.';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#070612' }}>
      <div className="fixed inset-0 pointer-events-none opacity-20 grid-bg" />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-24">
        <AnimatePresence mode="wait">

          {submitted ? (
            /* ── Success ── */
            <motion.div
              key="success"
              className="text-center max-w-sm"
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.5, ease }}
            >
              <motion.div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: 'rgba(240,112,48,0.12)', border: '1px solid rgba(240,112,48,0.28)' }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
              >
                <CheckCircle size={24} style={{ color: '#F07030' }} />
              </motion.div>
              <h2 className="text-2xl font-medium text-white mb-3">Request Received</h2>
              <p className="text-white/48 text-sm leading-relaxed mb-8">
                Thank you, {form.name.split(' ')[0]}. Our team will reach out within one
                business day to confirm your home consultation.
              </p>
              <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/38 hover:text-white/65 transition-colors">
                <ArrowLeft size={13} /> Back to home
              </Link>
            </motion.div>

          ) : (
            /* ── Form ── */
            <motion.div
              key="form"
              className="w-full max-w-lg"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease }}
            >
              <Link to="/" className="inline-flex items-center gap-2 text-xs text-white/32 hover:text-white/58 transition-colors mb-10 tracking-[0.1em] uppercase">
                <ArrowLeft size={12} /> Velaura
              </Link>

              <div className="mb-10">
                <p className="text-xs tracking-[0.25em] uppercase text-white/28 mb-3">Free Home Visit</p>
                <h1 className="text-3xl font-medium text-white leading-tight">Book a Consultation</h1>
                <p className="text-white/42 text-sm mt-3 leading-relaxed">
                  We'll visit your home at a time that suits you — no cost, no commitment.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

                {/* Name */}
                <Field label="Full Name" error={errors.name}>
                  <TextInput
                    placeholder="e.g. Sarah Tan"
                    value={form.name}
                    onChange={e => set('name', e.target.value)}
                    error={errors.name}
                  />
                </Field>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Email" error={errors.email}>
                    <TextInput
                      type="email"
                      placeholder="you@email.com"
                      value={form.email}
                      onChange={e => set('email', e.target.value)}
                      error={errors.email}
                    />
                  </Field>
                  <Field label="Phone Number" error={errors.phone}>
                    <TextInput
                      type="tel"
                      placeholder="+65 9123 4567"
                      value={form.phone}
                      onChange={e => set('phone', e.target.value)}
                      error={errors.phone}
                    />
                  </Field>
                </div>

                {/* Property type */}
                <Field label="Property Type" error={errors.propertyType}>
                  <CustomSelect
                    options={PROPERTY_TYPES}
                    value={form.propertyType}
                    onChange={v => set('propertyType', v)}
                    placeholder="Select property type"
                    error={errors.propertyType}
                  />
                </Field>

                {/* Rooms */}
                <Field label="Which rooms?" error={errors.rooms}>
                  <div className="flex flex-wrap gap-2">
                    {ROOMS.map(room => {
                      const active = form.rooms.includes(room);
                      return (
                        <motion.button
                          key={room}
                          type="button"
                          onClick={() => toggleRoom(room)}
                          className="rounded-full px-3.5 py-1.5 text-xs"
                          style={{
                            background: active ? 'rgba(240,112,48,0.14)' : 'rgba(255,255,255,0.04)',
                            border: active ? '1px solid rgba(240,112,48,0.38)' : '1px solid rgba(255,255,255,0.08)',
                            color: active ? '#F07030' : 'rgba(255,255,255,0.48)',
                          }}
                          whileHover={{
                            background: active ? 'rgba(240,112,48,0.2)' : 'rgba(255,255,255,0.07)',
                            color: active ? '#F07030' : 'rgba(255,255,255,0.75)',
                          }}
                          whileTap={{ scale: 0.93 }}
                          transition={{ duration: 0.12 }}
                        >
                          {room}
                        </motion.button>
                      );
                    })}
                  </div>
                </Field>

                {/* Date */}
                <Field label="Preferred Visit Date (optional)">
                  <CustomDatePicker value={form.date} onChange={v => set('date', v)} />
                </Field>

                {/* Message */}
                <Field label="Additional Notes (optional)">
                  <TextArea
                    placeholder="Any specific requirements, styles you like, or questions..."
                    value={form.message}
                    onChange={e => set('message', e.target.value)}
                  />
                </Field>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="mt-2 w-full rounded-full py-3.5 text-sm font-medium text-white relative overflow-hidden"
                  style={{ background: '#F07030' }}
                  whileHover={{ opacity: 0.88 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                >
                  <AnimatePresence mode="wait">
                    {loading ? (
                      <motion.span
                        key="loading"
                        className="flex items-center justify-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <motion.span
                          className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white block"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
                        />
                        Sending...
                      </motion.span>
                    ) : (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Request Home Consultation
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

                <p className="text-center text-xs text-white/22 leading-relaxed">
                  No payment required. Our team will confirm via WhatsApp or email.
                </p>

              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
